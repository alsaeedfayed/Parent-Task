import { Component } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../../../../core/services/http-handler/http-handler.service';
import { Config } from '../../../../core/configs/apis.config';
import { finalize } from 'rxjs';
import { authService } from '../../../../core/services/user-service/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private fb: NonNullableFormBuilder, private http: HttpService, private userService: authService,
    private router: Router
  ) { }


  isLoadingLogin: boolean = false;

  loginForm: FormGroup<{
    username: FormControl<string>;
    password: FormControl<string>;
  }> = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  login() {

    if (this.loginForm.invalid) return
    const payload = { ...this.loginForm.value, email: 'assessment@parent.eu' }

    //load spinner
    this.isLoadingLogin = true

    //send request
    this.http.post(`${Config.auth.login}`, payload).pipe(finalize(() => { this.isLoadingLogin = false })
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
