import { Component, Inject, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseComponent } from 'src/app/core/components/base.component';
import { UserGender } from 'src/app/core/constants/user-gender-constant';
import { Gender } from 'src/app/core/enums/gender';
import { Account } from 'src/app/core/models/account';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent extends BaseComponent implements OnInit {

  listGender = UserGender.Genders;
  public editProFileForm = this.formBuilder.group({
    username: [this.data.username],
    full_name: [this.data.full_name],
    mobile_phone: [this.data.mobile_phone],
    gender: [this.data.gender],
    date_of_birth: [new Date(this.data.date_of_birth)]
  });

  constructor(injector: Injector, public dialogRef: MatDialogRef<EditProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Account, private formBuilder: FormBuilder) {
    super(injector);
  }

  ngOnInit(): void {
  }
}
