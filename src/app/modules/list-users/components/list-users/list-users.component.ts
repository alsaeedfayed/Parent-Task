import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../../core/services/http-handler/http-handler.service';
import { User } from '../../../../core/models/user.model';
import { finalize, map } from 'rxjs';
import { Router } from '@angular/router';
import { ModalService } from '../../../../core/services/modal/modal.service';
import { FormGroup } from '@angular/forms';
import { NotificationsService } from '../../../../core/services/notifications/notifications.service';
import { OverlayLoaderService } from '../../../../core/services/overlay-loader/overlay-loader.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.scss'
})
export class ListUsersComponent implements OnInit {

  isEditMode: boolean = false;
  userToBeEdited!: User | null;
  userForm!: FormGroup;

  constructor(private http: HttpService, private router: Router, private modalService: ModalService, private overlayService: OverlayLoaderService, private notificationService: NotificationsService) { }

  ngOnInit(): void {
    this.getAllUsers()
  }

  users!: User[];

  getAllUsers(): void {
    this.http.get<User[]>('/users').pipe(
      map(
        (res: any) => {
          console.log(res)
          return res?.data;
        })

    ).subscribe((res: User[]) => {
      // console.log(res)
      this.users = res;
    })
  }

  //Navigate to specific user to see his details
  goToUser(id: number): void {
    this.router.navigate([`/user/${id}`])
  }

  openAddUserModal() {
    this.modalService.openModal('right', 'Add New User')
  }

  addUser() {
    //TODO Provide end point for adding user internal.
  }


  openEditUserModal(user: User) {
    this.isEditMode = true;
    this.userToBeEdited = user;
    this.modalService.openModal('right', `Edit user ${user.first_name}`)
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
  close() {
    this.modalService.closeModal('right', '');
    this.isEditMode = false;
    this.userToBeEdited = null;
  }

}
