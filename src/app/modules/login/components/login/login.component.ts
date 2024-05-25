import { Component } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../../../../core/services/http-handler/http-handler.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private fb: NonNullableFormBuilder , private http : HttpService) { }

  loginForm: FormGroup<{
    userName: FormControl<string>;
    password: FormControl<string>;
  }> = this.fb.group({
    userName: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });
  submitForm(){
    console.log(this.loginForm.value);
    this.http.post('/login', this.loginForm.value).subscribe(
      {
        next : (data) => {
          console.log(data);
        },
        error : (error) => {
          console.log(error)
        },
        complete : () => {}
      }
    )
  }
}
