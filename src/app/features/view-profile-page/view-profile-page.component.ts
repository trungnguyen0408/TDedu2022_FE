import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

@Component({
  selector: 'app-view-profile-page',
  templateUrl: './view-profile-page.component.html',
  styleUrls: ['./view-profile-page.component.scss']
})
export class ViewProfilePageComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onUpdate() {
    this.dialog.open(EditProfileComponent, {
      width: '500px',
    });
  }

  onChange() {
    this.dialog.open(ChangePasswordComponent, {
      width: '500px',
    });
  }
}
