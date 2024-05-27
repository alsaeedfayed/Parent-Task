import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../../core/services/http-handler/http-handler.service';
import { User } from '../../../../core/models/user.model';
import { finalize, map } from 'rxjs';
import { Router } from '@angular/router';
import { ModalService } from '../../../../core/services/modal/modal.service';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { NotificationsService } from '../../../../core/services/notifications/notifications.service';
import { OverlayLoaderService } from '../../../../core/services/overlay-loader/overlay-loader.service';
import { NzModalService } from 'ng-zorro-antd/modal';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  //-------------------COMPONENT PROPERTIES----------------
  isEditMode: boolean = false;
  userToBeEdited!: User | null;
  //userForm!: FormGroup;
  users!: User[];
  selectedUser! : User | null;

  userForm: FormGroup<{
    first_name: FormControl<string>;
    last_name: FormControl<string>;
    email: FormControl<string>;
  }> = this.fb.group({
    first_name: ['', [Validators.required]],
    last_name: ['', [Validators.required]],
    email: ['', [Validators.required , Validators.email]],

  });

  submitForm(){}

  constructor(private http: HttpService, private router: Router, private modalService: ModalService, private overlayService: OverlayLoaderService, private notificationService: NotificationsService , private modal: NzModalService, private fb: NonNullableFormBuilder) { }

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
    this.modalService.openPopUp();
  }

  addUser() {

    if(this.userForm.invalid){
      Object.values(this.userForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });

      return
    }

    else {
      this.overlayService.show()
      this.http.put(`/register`, this.userForm.value).pipe(finalize(
        () => {
          this.overlayService.hide();
          this.modalService.closePopUp();
          this.userForm.reset()
        }
      )).subscribe(
        {
          next: (data) => {
            this.close();
            this.notificationService.createBasicNotification('success', 'Success', 'user added successfully')
            this.getAllUsers();
          },
          error: (err) => { },

        }
      )
    }

  }


  openSingleUserModal(user : User) {
    this.selectedUser = user;
    this.modalService.openDrawer('right', '')
  }


  //---------------------EDIT USER ----------------------
  openEditUserModal(user: User) {
    this.isEditMode = true;
    this.selectedUser = user;
    this.userForm.patchValue(user)
   // this.modalService.openDrawer('right', `Edit user ${user.first_name}`)
   this.modalService.openPopUp();
  }
  editUser() {

    if(this.userForm.invalid){
      Object.values(this.userForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });

      return
    }

    else {
      this.overlayService.show()
      this.http.put(`/users/${this.selectedUser?.id}`, this.userForm.value).pipe(finalize(
        () => {
          this.overlayService.hide();
          this.modalService.closePopUp();
          this.userForm.reset()
        }
      )).subscribe(
        {
          next: (data) => {
            this.close();
            this.notificationService.createBasicNotification('success', 'Success', 'user has been updated')
            this.getAllUsers();
          },
          error: (err) => { },

        }
      )
    }

  }
  userFormListener(form: FormGroup) {
    this.userForm = form
  }

  //-------------------- CLOSE THE MODAL ---------------
  close() {
    this.modalService.closeDrawer('right', '');
    this.isEditMode = false;
    this.userToBeEdited = null;
    this.selectedUser = null
  }

  closePopUp(){
    this.modalService.closePopUp();
    this.isEditMode = false;
    this.selectedUser = null;
    this.userForm.reset();
  }

  //---------------- DELETE USER ------------------------
  showDeleteConfirm(user : User): void {
    this.modal.confirm({
      nzTitle: `Are you sure delete ${user.first_name}`,

      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {this.deleteUser(user.id) },
      nzCancelText: 'No',
      nzOnCancel: () => {}
    });
  }

  deleteUser(id : number){
    this.overlayService.show()
    this.http.delete(`/users/${id}`).pipe(finalize(() => {
      this.overlayService.hide();
      ; this.close()
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
