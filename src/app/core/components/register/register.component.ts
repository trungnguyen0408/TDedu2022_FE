import { Component, Inject, Injector, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { finalize, Subject } from 'rxjs';
import { APP_MESSAGE } from '../../constants/app-message-constant';
import { Gender } from '../../enums/gender';
import { RegisterUser } from '../../models/register-user';
import { AuthService } from '../../services/auth.service';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends BaseComponent implements OnInit {
  searchKeyWordChange = new Subject<string>();
  public registerForm = this.formBuilder.group({
    userName: [''],
    fullName: [''],
    phone: [''],
    email: [''],
    passWord: [''],
    confirmPassword: [''],
    gender: [''],
    dob: []
  });

  public forgotForm = this.formBuilder.group({
    emailOrUserName: ['', Validators.required],
  });

  constructor(injector: Injector, private authService: AuthService, public dialogRef: MatDialogRef<RegisterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder) {
    super(injector);
  }

  ngOnInit(): void {
  }

  onRegister(): void {
    const user = new RegisterUser();
    user.full_name = this.registerForm.value.fullName;
    user.userName = this.registerForm.value.userName;
    user.email = this.registerForm.value.email;
    user.mobile_phone = this.registerForm.value.phone;
    user.gender = this.registerForm.value.gender;
    user.day_of_birth = this.formatDate(this.registerForm.value.dob);
    user.password = this.registerForm.value.passWord;
    user.password_confirmation = this.registerForm.value.confirmPassword;

    this.showLoader();
    this.authService.registerUser(user).pipe(finalize(() => {
      this.showLoader(false);
    })).subscribe(() => {
      this.alertMessageService.success(APP_MESSAGE.REGISTER_SUCCESSFULL);
      this.dialogRef.close();

    }, (err) => {
      this.alertMessageService.error(`${err.error.username ?? ''}
      ${err.error.password ?? ''} ${err.error.password ?? ''} ${err.error.mobile_phone ?? ''}
      ${err.error.date_of_birth ?? ''} ${err.error.gender ?? ''}`);
      return
    })
    this.dialogRef.close();
  }

  onForgot() {
    const inputValue = this.forgotForm.value.emailOrUserName;
    this.showLoader();
    this.authService.forgotPassword(inputValue).pipe(finalize(() => {
      this.showLoader(false);
    })).subscribe(data => {
      if (data) {
        this.alertMessageService.success(data.message);
      }
    })
    this.dialogRef.close();
  }

  public getEnumGender() {
    return Gender;
  }
}
