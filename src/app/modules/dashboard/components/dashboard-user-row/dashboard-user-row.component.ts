import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../../../core/models/user.model';
import { Action } from '../../models/user-actions.model';

@Component({
  selector: 'app-dashboard-user-row',
  templateUrl: './dashboard-user-row.component.html',
  styleUrl: './dashboard-user-row.component.scss',

})
export class DashboardUserRowComponent {
  @Input() user!: User;
  @Output() ActionType: EventEmitter<{ action: Action, user: User }> = new EventEmitter();
  @Output() selectedUser: EventEmitter<User> = new EventEmitter();

  openEditUserModal(user: User , event: Event): void {
    event.stopPropagation();
    this.ActionType.emit({ action: 'edit', user })
  }

  showDeleteConfirm(user: User , event : Event): void {
    event.stopPropagation();
    this.ActionType.emit({ action: 'delete', user })
  }

  openSingleUserModal(user: User): void {
    this.ActionType.emit({ action: 'details', user })
  }

  selectRow(user: User) {

    const allListItems = document.querySelectorAll('.card__list-users--user');
    allListItems.forEach((element: any) => {
      element.classList.remove('selected');
    });

    const clickedListItem = document.querySelector(`#user-${user.id}`);
    if (clickedListItem) {
      clickedListItem.classList.add('selected');
    }

    this.selectedUser.emit(user);
  }


}
