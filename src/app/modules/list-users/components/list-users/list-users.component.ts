import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../../core/services/http-handler/http-handler.service';
import { User } from '../../../../core/models/user.model';
import { finalize, map } from 'rxjs';
import { Router } from '@angular/router';
import { ModalService } from '../../../../core/services/modal/modal.service';
import { FormGroup } from '@angular/forms';
import { NotificationsService } from '../../../../core/services/notifications/notifications.service';
import { OverlayLoaderService } from '../../../../core/services/overlay-loader/overlay-loader.service';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.scss'
})
export class ListUsersComponent implements OnInit {

  //-------------------COMPONENT PROPERTIES----------------
  isEditMode: boolean = false;
  userToBeEdited!: User | null;
  userForm!: FormGroup;
  users!: User[];

  constructor(private http: HttpService, private router: Router, private modalService: ModalService, private overlayService: OverlayLoaderService, private notificationService: NotificationsService , private modal: NzModalService) { }

  ngOnInit(): void {
    this.getAllUsers()
  }


  //------------------GET ALL USERS -------------------------
  getAllUsers(): void {
    this.overlayService.show()
    this.http.get<User[]>('/users').pipe(
      finalize(() => {
        this.overlayService.hide();
      }),
      map(
        (res: any) => {
        //  console.log(res)
          return res?.data;
        })

    ).subscribe((res: User[]) => {
      // console.log(res)
      this.users = res;
    })
  }

  //-----------------ROUTE TO SPECIFIC USER-------------------
  goToUser(id: number): void {
    this.router.navigate([`/user/${id}`])
  }


  //TODO Provide end point for adding user internal.
  openAddUserModal() {
    this.modalService.openDrawer('right', 'Add New User')
  }
  addUser() {

  }


  //---------------------EDIT USER ----------------------
  openEditUserModal(user: User) {
    this.isEditMode = true;
    this.userToBeEdited = user;
    this.modalService.openDrawer('right', `Edit user ${user.first_name}`)
  }
  editUser() {
    this.overlayService.show()
    this.http.put(`/users/${this.userToBeEdited?.id}`, this.userForm.value).pipe(finalize(
      () => {
        this.overlayService.hide();
        this.notificationService.createBasicNotification('success', 'Success', 'user has been updated')
      }
    )).subscribe(
      {
        next: (data) => {
          this.close();
          this.getAllUsers();
        },
        error: (err) => { },

      }
    )
  }
  userFormListener(form: FormGroup) {
    this.userForm = form
  }

  //-------------------- CLOSE THE MODAL ---------------
  close() {
    this.modalService.closeDrawer('right', '');
    this.isEditMode = false;
    this.userToBeEdited = null;
  }


  //---------------- DELETE USER ------------------------
  showDeleteConfirm(user : User): void {
    this.modal.confirm({
      nzTitle: `Are you sure delete ${user.first_name}`,

      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.deleteUser(user.id),
      nzCancelText: 'No',
      nzOnCancel: () => {}
    });
  }

  deleteUser(id : number){
    this.overlayService.show()
    this.http.delete(`/users/${id}`).pipe(finalize(() => {
      this.overlayService.hide();
      this.getAllUsers();
      this.notificationService.createBasicNotification('success', 'Success', 'user has been deleted')
    })).subscribe(
      {
        next : (res) => {},
        error : (err) => {}
      },

    )
  }
}
