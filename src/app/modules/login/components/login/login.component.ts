import { Component } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../../../../core/services/http-handler/http-handler.service';
import { Config } from '../../../../core/configs/apis.config';
import { finalize } from 'rxjs';
import { authService } from '../../../../core/services/auth/auth-service.service';
import { Router } from '@angular/router';
import { OverlayLoaderService } from '../../../../core/services/overlay-loader/overlay-loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private fb: NonNullableFormBuilder, private http: HttpService, private userService: authService,
    private router: Router, private overlayLoader : OverlayLoaderService
  ) {

  }


  //---------------------- BUILD FORM ------------------
  loginForm: FormGroup<{
    username: FormControl<string>;
    password: FormControl<string>;
  }> = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });


  //---------------------- LOGIN ------------------------
  login() {

    if (this.loginForm.invalid) return
    const payload = { ...this.loginForm.value, email: 'assessment@parent.eu' }
    //start loader
    this.overlayLoader.show()
    //send request
    this.http.post(`${Config.auth.login}`, payload).pipe(finalize(() => {  this.overlayLoader.hide() })
    ).subscribe(
      {
        next: (res: any) => {
          this.userService.setToken(res.token)
          //navigate to desired page
          this.router.navigate(['/dashboard']);


        },
        error: (err: any) => {
          // we already have our general httpError handler in case http request error, but here we can set specific error handler
        },

      }
    )
  }




}
