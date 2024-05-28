import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrl: './dashboard-header.component.scss'
})
export class DashboardHeaderComponent {

  @Output() openAddUser : EventEmitter<void> = new EventEmitter()
  openAddUserModal() : void {
    this.openAddUser.emit()
  }
}
