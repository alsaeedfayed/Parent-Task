import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../../../../core/services/http-handler/http-handler.service';
import { User } from '../../../../core/models/user.model';
import { finalize, map } from 'rxjs';
import { Router } from '@angular/router';
import { ModalService } from '../../../../core/services/modal/modal.service';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { NotificationsService } from '../../../../core/services/notifications/notifications.service';
import { OverlayLoaderService } from '../../../../core/services/overlay-loader/overlay-loader.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Action } from '../../models/user-actions.model';
import { DashboardPropertiesAndServerActions } from '../../classes/dashboardPropertiesAndServerActions.class';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent extends DashboardPropertiesAndServerActions implements OnInit {

  constructor(http: HttpService, modalService: ModalService, overlayService: OverlayLoaderService, notificationService: NotificationsService, modal: NzModalService, fb: NonNullableFormBuilder ) {
    super(fb, http, overlayService, notificationService, modal, modalService);
  }

  ngOnInit(): void {
    this.getAllUsers()
  }


  doUserAction(event: { action: Action, user: User }): void {
    switch (event.action) {
      case 'edit':
        this.openEditUserModal(event.user)
        break;
      case 'delete':
        this.showDeleteConfirm(event.user)
        break;
      case 'details':
        this.openSingleUserModal(event.user)
        break;
      default:
        break;
    }
  }

  //------------------------ ADD NEW USER------------------------
  openAddUserModal() {
    this.modalService.openPopUp();
  }
  onAddUser(): void {
    if (this.userForm.invalid) {
      this.validateUserForm();
    }
    else {
      this.submitNewUser(this.closePopUp, this.onSuccessAddUser, this.onErrorAddUser)

    }
  }

  onSuccessAddUser = (): void => {
    this.notificationService.createBasicNotification('success', 'Success', 'user added successfully');
    //this.closePopUp()
    this.getAllUsers();
  }

  onErrorAddUser = (): void => {
    //this.closePopUp(); //already implemented in finalize , we can have some other logic
  }

  //---------------------EDIT USER ----------------------
  openEditUserModal(user: User) {
    this.isEditMode = true;
    this.selectedUser = user;
    this.userForm.patchValue(user)
    this.modalService.openPopUp();
  }
  onEditUser() {
    if (this.userForm.invalid) {
      this.validateUserForm()
    }
    else {
      this.submitEditUser(this.closePopUp, this.onSuccessEditUser, this.onErrorEditser);
    }
  }

  onSuccessEditUser = (): void => {
    this.notificationService.createBasicNotification('success', 'Success', 'user edited successfully');
    this.closeDrawer(); //in case i need to close the drawer.
    this.getAllUsers();
  }

  onErrorEditser(): void { }

  //---------------- DELETE USER ------------------------
  showDeleteConfirm(user: User): void {
    this.modal.confirm({
      nzTitle: `Are you sure delete ${user.first_name}`,
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => { this.submitDeleteUser(user.id , this.onSuccessDeleteUser, this.onErrorDeleteUser) },
      nzCancelText: 'No',
      nzOnCancel: () => { }
    });
  }

  onSuccessDeleteUser = () : void => {
    this.getAllUsers();
    this.notificationService.createBasicNotification('success', 'Success', 'user has been deleted')
  }

  onErrorDeleteUser = () : void =>  {}


  //---------------------------- NON SERVER SIDE ACTIONS -------------------------
  validateUserForm() {
  Object.values(this.userForm.controls).forEach(control => {
    if (control.invalid) {
      control.markAsDirty();
      control.updateValueAndValidity({ onlySelf: true });
    }
  });

  return
}
openSingleUserModal(user: User) {
  this.selectedUser = user;
  this.modalService.openDrawer('right', '')
}

//-------------------- CLOSE THE MODAL ---------------
closeDrawer() {
  this.modalService.closeDrawer('right', '');
  this.isEditMode = false;
  this.userToBeEdited = null;
  this.selectedUser = null;
}

closePopUp = (): void => {
  this.modalService.closePopUp();
  this.isEditMode = false;
  this.selectedUser = null;
  this.userForm.reset();
  this.objectUrl = '';
}

//UPLOAD IMAGE
onFileSelected(event : any) {
  this.selectedUserImage = event.target.files[0];
  this.objectUrl = window.URL.createObjectURL(this.selectedUserImage);
}

@ViewChild('scrollableDiv') scrollableDiv!: ElementRef;

onScroll(){
  const element = this.scrollableDiv.nativeElement;
  //console.log(element)
  if (element.scrollHeight - element.scrollTop === element.clientHeight) {
  // console.log('hiole')
  this.getAllUsers()
  }
}

}
