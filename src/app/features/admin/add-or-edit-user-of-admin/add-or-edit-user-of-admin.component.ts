import { Component, Inject, Injector, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { finalize } from 'rxjs';
import { BaseComponent } from 'src/app/core/components/base.component';
import { APP_MESSAGE } from 'src/app/core/constants/app-message-constant';
import { UserGender } from 'src/app/core/constants/user-gender-constant';
import { UserRole } from 'src/app/core/constants/user-role-constant';
import { UserStatus } from 'src/app/core/constants/user-status-constant';
import { ActionType } from 'src/app/core/enums/action-type';
import { AccountUser } from 'src/app/core/models/account-user';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-add-or-edit-user-of-admin',
  templateUrl: './add-or-edit-user-of-admin.component.html',
  styleUrls: ['./add-or-edit-user-of-admin.component.scss']
})
export class AddOrEditUserOfAdminComponent extends BaseComponent implements OnInit {
  listGender = UserGender.Genders;
  listStatus = UserStatus.Status;
  listRole = UserRole.Roles;
  actionType: ActionType = ActionType.none;

  formCreateUser = this.formBuilder.group({
    fullName: ['', Validators.required],
    userName: ['', Validators.required],
    email: ['', Validators.required],
    phone: ['', Validators.required],
    dob: ['', Validators.required],
    address: ['', Validators.required],
    gender: ['', Validators.required],
    role: ['', Validators.required],
  });

  public formEditUser = this.formBuilder.group({
    fullName: [this.data.user.full_name ?? ''],
    userName: [this.data.user.username ?? ''],
    phone: [this.data.user.mobile_phone ?? ''],
    dob: [new Date(this.data.user.date_of_birth) ?? ''],
    address: [this.data.user.address ?? ''],
    gender: [this.data.user.gender ?? ''],
    status: [this.data.user.status ?? ''],
    role: [this.data.user.role ? this.data.user.role[0] : ''],
    duration: [this.data.user.duration ?? ''],
    reasonBan: [this.data.user.reason_ban ?? '']
  });

  constructor(injector: Injector, private userService: UserService, private formBuilder: FormBuilder, public dialogRef: MatDialogRef<AddOrEditUserOfAdminComponent>,
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
    addUser.role = this.formCreateUser.value.role;

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
        this.alertMessageService.error(APP_MESSAGE.CREATE_FAILED);
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
    editUser.duration = this.formEditUser.value.duration;
    editUser.reasonBan = this.formEditUser.value.reasonBan;
    editUser.role = this.formEditUser.value.role;

    this.showLoader();
    this.userService.update(editUser, this.data.user.id)
      .pipe(finalize(() => {
        this.showLoader(false);
      }))
      .subscribe(response => {
        if (response) {
          this.alertMessageService.success(APP_MESSAGE.SAVE_SUCCESSFULL);
        }
      })
  }
}
