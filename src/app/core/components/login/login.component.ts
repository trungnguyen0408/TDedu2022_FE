import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RegisterComponent } from '../register/register.component';
import { LocalStorageService } from '../../services/localStorage.service';
import { BaseComponent } from '../base.component';
import { finalize } from 'rxjs';
import { APP_MESSAGE } from '../../constants/app-message-constant';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements OnInit {
  valueCaptcha: string;

  constructor(injector: Injector, public dialog: MatDialog, private authService: AuthService, private formBuilder: FormBuilder, private router: Router, private localStorageService: LocalStorageService) {
    super(injector);
    if (authService.isLoggedIn$) {
      this.router.navigate(['/home']);
    }
  }

  ngOnInit(): void {
    this.valueCaptcha = this.randomString(6);
  }

  randomString(length, chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHJKLMNOPQRSTUVWXYZ') {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)] + " ";
    return result;
  }

  onChangeCaptcha() {
    this.valueCaptcha = this.randomString(6);
  }

  public loginForm = this.formBuilder.group({
    userName: ['', Validators.required],
    passWord: ['', Validators.required],
    captcha: ['']
  });

  openDialog(isForgot: boolean = false) {
    if (isForgot) {
      this.dialog.open(RegisterComponent, {
        width: '600px',
        data: 'isForgot'
      });
    } else {
      this.dialog.open(RegisterComponent, {
        width: '500px',
        data: 'isRegister'
      });
    }

  }

  onLogin() {
    const userName = this.loginForm.value.userName;
    const passWord = this.loginForm.value.passWord;
    const captcha = this.loginForm.value.captcha;

    if (this.replaceSpace(this.valueCaptcha) !== captcha) {
      this.alertMessageService.error(APP_MESSAGE.CAPTCHA_ERROR);
      return;
    }

    this.showLoader();
    this.authService.logIn(userName, passWord).pipe(finalize(() => {
      this.showLoader(false);
    }))
      .subscribe(data => {
        if (data) {
          this.localStorageService.setToken(data.access_token);
          this.localStorageService.setItem("role", data.user.role[0]);
          this.localStorageService.setItem("user_current", data.user.username);
          this.alertMessageService.success(APP_MESSAGE.LOGIN_SUCCESSFULL);
          this.authService.loggedIn$.next(true);
          this.router.navigate(['/home']);
        }
      }, (err) => {
        this.loginForm.controls['passWord'].reset();
        this.onChangeCaptcha();
        this.alertMessageService.error(`${err.error[Object.keys(err.error)[0]] ?? ''}`);
      })
  }
}
