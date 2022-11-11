import { Component, Inject, Injector, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseComponent } from 'src/app/core/components/base.component';
import { UserGender } from 'src/app/core/constants/user-gender-constant';
import { UserStatus } from 'src/app/core/constants/user-status-constant';
import { ActionType } from 'src/app/core/enums/action-type';
import { AccountUser } from 'src/app/core/models/account-user';
import { UserService } from 'src/app/core/services/user.service';
import { finalize } from 'rxjs';
import { APP_MESSAGE } from 'src/app/core/constants/app-message-constant';

@Component({
  selector: 'app-add-or-edit-user-of-lecturer',
  templateUrl: './add-or-edit-user-of-lecturer.component.html',
  styleUrls: ['./add-or-edit-user-of-lecturer.component.scss']
})
export class AddOrEditUserOfLecturerComponent extends BaseComponent implements OnInit {
  listGender = UserGender.Genders;
  listStatus = UserStatus.Status.filter(x => x.text !== 'Banned');

  formCreateUser = this.formBuilder.group({
    fullName: ['', Validators.required],
    userName: ['', Validators.required],
    email: ['', Validators.required],
    phone: ['', Validators.required],
    dob: ['', Validators.required],
    address: ['', Validators.required],
    gender: ['', Validators.required],
  });

  public formEditUser = this.formBuilder.group({
    fullName: [this.data.user.full_name ?? ''],
    userName: [this.data.user.username ?? ''],
    email: [this.data.user.email ?? ''],
    phone: [this.data.user.mobile_phone ?? ''],
    dob: [new Date(this.data.user.date_of_birth) ?? ''],
    address: [this.data.user.address ?? ''],
    gender: [this.data.user.gender ?? ''],
    status: [this.data.user.status ?? ''],
  });

  constructor(injector: Injector, private userService: UserService, private formBuilder: FormBuilder, public dialogRef: MatDialogRef<AddOrEditUserOfLecturerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    super(injector);
  }

  ngOnInit(): void {
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
    addUser.username = this.formCreateUser.value.userName;
    addUser.email = this.formCreateUser.value.email;
    addUser.mobile_phone = this.formCreateUser.value.phone;
    addUser.date_of_birth = this.formatDate(this.formCreateUser.value.dob);
    addUser.address = this.formCreateUser.value.address;
    addUser.gender = this.formCreateUser.value.gender;
    addUser.role = 'Student';
    this.showLoader();
    this.userService.create(addUser)
      .pipe(finalize(() => {
        this.showLoader(false);
      }))
      .subscribe(response => {
        if (response) {
          this.alertMessageService.success(APP_MESSAGE.CREATE_USER_SUCCESSFULL);
        }
      }, (err) => {
        this.alertMessageService.error(`${err.error[Object.keys(err.error)[0]] ?? ''}`);
      })
  }

  onEdit() {
    const editUser = new AccountUser();
    editUser.full_name = this.formEditUser.value.fullName;
    editUser.username = this.formEditUser.value.userName;
    editUser.email = this.formEditUser.value.email;
    editUser.mobile_phone = this.formEditUser.value.phone;
    editUser.date_of_birth = this.formatDate(this.formEditUser.value.dob);
    editUser.address = this.formEditUser.value.address;
    editUser.gender = this.formEditUser.value.gender;
    editUser.status = this.formEditUser.value.status;
    editUser.role = 'Student';
    this.showLoader();
    this.userService.update(editUser, this.data.user.id)
      .pipe(finalize(() => {
        this.showLoader(false);
      }))
      .subscribe(response => {
        if (response) {
          this.alertMessageService.success(APP_MESSAGE.SAVE_SUCCESSFULL);
        }
      }, (err) => {
        this.alertMessageService.error(`${err.error[Object.keys(err.error)[0]] ?? ''}`);
      })
  }
}
