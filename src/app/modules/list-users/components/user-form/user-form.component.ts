import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { User } from '../../../../core/models/user.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent implements OnInit {


  @Input('user') set user(value: User | null) {
    if (value !== null) { this.userForm.patchValue(value) } else { this.userForm.reset() }

  }

  @Output('formUser') formUser = new EventEmitter<any>();

  constructor(private fb: NonNullableFormBuilder) { }

  ngOnInit(): void {
    this.userForm.valueChanges.subscribe(() => {
      this.formUser.emit(this.userForm)
    })
  }
  userForm: FormGroup<{
    first_name: FormControl<string>;
    last_name: FormControl<string>;
    email: FormControl<string>;
  }> = this.fb.group({
    first_name: ['', [Validators.required]],
    last_name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],

  });

}
