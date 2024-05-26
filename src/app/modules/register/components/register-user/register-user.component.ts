import { Component } from '@angular/core';
import { Config } from '../../../../core/configs/apis.config';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { HttpService } from '../../../../core/services/http-handler/http-handler.service';
import { authService } from '../../../../core/services/user-service/auth-service.service';
import { OverlayLoaderService } from '../../../../core/services/overlay-loader/overlay-loader.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.scss'
})
export class RegisterUserComponent {

  constructor(private fb: NonNullableFormBuilder, private http: HttpService, private userService: authService,
    private router: Router, private overlayLoader: OverlayLoaderService
  ) {

  }


  registerForm: FormGroup<{
    username: FormControl<string>;
    email: FormControl<string>;
    password: FormControl<string>;
  }> = this.fb.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  signUp() {

    if (this.registerForm.invalid) return
    const payload = this.registerForm.value;
    //start loader
    this.overlayLoader.show()
    console.log(payload)

    //send request
    this.http.post(`${Config.auth.register}`, payload).pipe(finalize(() => { this.overlayLoader.hide() })
    ).subscribe(
      {
        next: (res: any) => {
          this.userService.setToken(res.token)
          //navigate to desired page
          //this.router.navigate(['/xxxxxxxx']);


        },
        error: (err: any) => {
          // we already have our general httpError handler in case http request error, but here we can set specific error handler
        },

      }
    )
  }



}
