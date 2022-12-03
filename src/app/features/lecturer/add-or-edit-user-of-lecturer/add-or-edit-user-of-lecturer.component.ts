import { Component, Inject, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseComponent } from 'src/app/core/components/base.component';
import { UserGender } from 'src/app/core/constants/user-gender-constant';
import { UserStatus } from 'src/app/core/constants/user-status-constant';
import { ActionType } from 'src/app/core/enums/action-type';
import { AccountUser } from 'src/app/core/models/account-user';
import { UserService } from 'src/app/core/services/user.service';
import { finalize } from 'rxjs';
import { APP_MESSAGE } from 'src/app/core/constants/app-message-constant';
import { UserDuration } from 'src/app/core/constants/user-duration-constant';
import { STATUS_BAN } from 'src/app/core/constants/status-ban-constant';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/core/services/localStorage.service';

@Component({
  selector: 'app-add-or-edit-user-of-lecturer',
  templateUrl: './add-or-edit-user-of-lecturer.component.html',
  styleUrls: ['./add-or-edit-user-of-lecturer.component.scss']
})
export class AddOrEditUserOfLecturerComponent extends BaseComponent implements OnInit {
  listGender = UserGender.Genders;
  listStatus = UserStatus.Status;
  listDuration = UserDuration.Durations;

  formCreateUser = this.formBuilder.group({
    fullName: ['', Validators.required],
    userName: ['', Validators.required],
    email: ['', Validators.required],
    phone: ['', Validators.required],
    dob: ['', Validators.required],
    address: ['', Validators.required],
    gender: ['', Validators.required],
  });
  public formEditUser: FormGroup;

  constructor(injector: Injector, public localStorageService: LocalStorageService, private router: Router, private authService: AuthService, private userService: UserService, private formBuilder: FormBuilder, public dialogRef: MatDialogRef<AddOrEditUserOfLecturerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    super(injector);
    this.formEditUser = new FormGroup({
      fullName: new FormControl(this.data.user.full_name ?? ''),
      userName: new FormControl(this.data.user.username ?? ''),
      mobile_phone: new FormControl(this.data.user.mobile_phone ?? ''),
      dob: new FormControl(new Date(this.data.user.date_of_birth) ?? ''),
      address: new FormControl(this.data.user.address ?? ''),
      gender: new FormControl(this.data.user.gender ?? ''),
      status: new FormControl(this.data.user.status ?? ''),
      role: new FormControl(this.data.user.role ? this.data.user.role[0] : ''),
      duration: new FormControl(this.data.user.is_ban ? this.convertValueToCharOfDuration(this.data.user.is_ban.duration) : ''),
      reasonBan: new FormControl(this.data.user.is_ban ? this.data.user.is_ban.comment : ''),
    });
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
        if (err.error[Object.keys(err.error)[0]] === STATUS_BAN.UNAUTHORIZED) {
          this.alertMessageService.error(APP_MESSAGE.BANNED);
          this.authService.logOut().subscribe(data => {
            if (data) {
              this.localStorageService.removeAll();
              this.authService.loggedIn$.next(false);
              this.router.navigate(['']);
            }
          });
        } else {
          this.alertMessageService.error(`${err.error[Object.keys(err.error)[0]] ?? ''}`);
        }
      })
  }

  onEdit() {
    const editUser = new AccountUser();
    editUser.full_name = this.formEditUser.value.fullName;
    editUser.username = this.formEditUser.value.userName;
    editUser.mobile_phone = this.formEditUser.value.mobile_phone;
    editUser.date_of_birth = this.formatDate(this.formEditUser.value.dob);
    editUser.address = this.formEditUser.value.address;
    editUser.gender = this.formEditUser.value.gender;
    editUser.status = this.formEditUser.value.status;
    editUser.duration = this.formEditUser.value.duration;
    editUser.reasonBan = this.formEditUser.value.reasonBan;
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
        if (err.error[Object.keys(err.error)[0]] === STATUS_BAN.UNAUTHORIZED) {
          this.alertMessageService.error(APP_MESSAGE.BANNED);
          this.authService.logOut().subscribe(data => {
            if (data) {
              this.localStorageService.removeAll();
              this.authService.loggedIn$.next(false);
              this.router.navigate(['']);
            }
          });
        } else {
          this.alertMessageService.error(`${err.error[Object.keys(err.error)[0]] ?? ''}`);
        }
      })
  }
}
