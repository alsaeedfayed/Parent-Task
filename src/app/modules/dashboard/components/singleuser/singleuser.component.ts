import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../../../core/models/user.model';

@Component({
  selector: 'app-singleuser',
  templateUrl: './singleuser.component.html',
  styleUrl: './singleuser.component.scss'
})
export class SingleuserComponent {


  user! : User;
  @Input() set singleUser(value : User | null){
    if(value) this.user = value;
  }

  @Output() editAction : EventEmitter<User> = new EventEmitter();
  @Output() deleteAction : EventEmitter<User> = new EventEmitter();

  editUser(user : User) : void{
    this.editAction.emit(user)
  }

  deleteUser(user : User) : void{
    this.deleteAction.emit(user)
  }


}
