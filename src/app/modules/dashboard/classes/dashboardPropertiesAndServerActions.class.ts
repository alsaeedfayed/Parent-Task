import { FormGroup, FormControl, Validators, NonNullableFormBuilder } from "@angular/forms";
import { User } from "../../../core/models/user.model";
import { Router } from "@angular/router";
import { NzModalService } from "ng-zorro-antd/modal";
import { HttpService } from "../../../core/services/http-handler/http-handler.service";
import { ModalService } from "../../../core/services/modal/modal.service";
import { NotificationsService } from "../../../core/services/notifications/notifications.service";
import { OverlayLoaderService } from "../../../core/services/overlay-loader/overlay-loader.service";
import { finalize, map } from "rxjs";

export class DashboardPropertiesAndServerActions {

  constructor(protected fb: NonNullableFormBuilder, protected http: HttpService, protected overlayService: OverlayLoaderService, protected notificationService: NotificationsService, protected modal: NzModalService, protected modalService: ModalService) { }

  //-------------------DASHBOARD PROPERTIES----------------
  protected isEditMode: boolean = false;
  protected userToBeEdited!: User | null;
  //userForm!: FormGroup;
  protected users!: User[];
  protected selectedUser!: User | null;
  protected selectedUserImage! : File;
  protected   objectUrl!: string;

  protected userForm: FormGroup<{
    first_name: FormControl<string>;
    last_name: FormControl<string>;
    email: FormControl<string>;
  }> = this.fb.group({
    first_name: ['', [Validators.required]],
    last_name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],

  });



  //SERVER ACTIONS

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

  //------------------SUBMIT NEW USER ------------------------
  protected submitNewUser(closeModal: () => void, onSuccess: () => void, onError: () => void): void {
    this.overlayService.show()
    this.http.put(`/register`, this.userForm.value).pipe(finalize(
      () => {
        this.overlayService.hide();
        closeModal()
        this.userForm.reset()
      }
    )).subscribe(
      {
        next: (data) => {
          onSuccess();
        },
        error: (err) => {
          onError();
        },

      }
    )
  }

  //------------------SUBMIT EDIT USER ------------------------
  protected submitEditUser(closeModal: () => void, onSuccess: () => void, onError: () => void): void {
    this.overlayService.show()
    this.http.put(`/users/${this.selectedUser?.id}`, this.userForm.value).pipe(finalize(
      () => {
        this.overlayService.hide();
        closeModal();
        this.userForm.reset()
      }
    )).subscribe(
      {
        next: (data) => {
          onSuccess();
        },
        error: (err) => {
          onError()
        },

      }
    )
  }

  //------------------SUBMIT DELETE USER ------------------------
  protected submitDeleteUser(id: number, onSuccess: () => void, onError: () => void): void {
    this.overlayService.show()
    this.http.delete(`/users/${id}`).pipe(finalize(() => {
      this.overlayService.hide()
    })).subscribe(
      {
        next: (res) => {
          onSuccess();
        },
        error: (err) => {
          onError();
        }
      },

    )
  }

}
