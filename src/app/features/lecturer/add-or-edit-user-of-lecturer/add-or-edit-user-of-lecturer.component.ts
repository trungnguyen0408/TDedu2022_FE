import { Component, Inject, Injector, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseComponent } from 'src/app/core/components/base.component';
import { UserGender } from 'src/app/core/constants/user-gender-constant';
import { UserStatus } from 'src/app/core/constants/user-status-constant';
import { ActionType } from 'src/app/core/enums/action-type';
import { AccountUser } from 'src/app/core/models/account-user';

@Component({
  selector: 'app-add-or-edit-user-of-lecturer',
  templateUrl: './add-or-edit-user-of-lecturer.component.html',
  styleUrls: ['./add-or-edit-user-of-lecturer.component.scss']
})
export class AddOrEditUserOfLecturerComponent extends BaseComponent implements OnInit {

  public formCreateUser = this.formBuilder.group({
    fullName: ['', Validators.required],
    userName: ['', Validators.required],
    email: ['', Validators.required],
    phone: ['', Validators.required],
    dob: ['', Validators.required],
    address: ['', Validators.required],
    gender: ['', Validators.required],
  });

  public formEditUser = this.formBuilder.group({
    fullName: [''],
    userName: [''],
    email: [''],
    phone: [''],
    dob: [''],
    address: [''],
    gender: [''],
    status: [''],
  });

  listGender = UserGender.Genders;
  listStatus = UserStatus.Status.filter(x => x.text !== 'Banned');
  actionType: ActionType = ActionType.none;

  constructor(injector: Injector, private formBuilder: FormBuilder, public dialogRef: MatDialogRef<AddOrEditUserOfLecturerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ActionType) {
    super(injector);
  }

  ngOnInit(): void {
    this.actionType = this.data;
  }

  getPageType() {
    return ActionType;
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onCreate() {
    const addUser = new AccountUser();
    addUser.full_name = this.formCreateUser.value.fullName;
    addUser.userName = this.formCreateUser.value.userName;
    addUser.email = this.formCreateUser.value.email;
    addUser.mobile_phone = this.formCreateUser.value.phone;
    addUser.day_of_birth = this.formatDate(this.formCreateUser.value.dob);
    addUser.address = this.formCreateUser.value.address;
    addUser.gender = this.formCreateUser.value.gender;
    addUser.role = 'Student';
    //call api
  }

  onEdit() {
    const editUser = new AccountUser();
    editUser.full_name = this.formEditUser.value.fullName;
    editUser.userName = this.formEditUser.value.userName;
    editUser.email = this.formEditUser.value.email;
    editUser.mobile_phone = this.formEditUser.value.phone;
    editUser.day_of_birth = this.formatDate(this.formEditUser.value.dob);
    editUser.address = this.formEditUser.value.address;
    editUser.gender = this.formEditUser.value.gender;
    editUser.status = this.formEditUser.value.status;
    //call api
  }

}
