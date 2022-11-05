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
  constructor(injector: Injector, public dialog: MatDialog, private authService: AuthService, private formBuilder: FormBuilder, private router: Router, private localStorageService: LocalStorageService) {
    super(injector);
    if (authService.isLoggedIn$) {
      this.router.navigate(['/home']);
    }
  }

  ngOnInit(): void {
  }

  public loginForm = this.formBuilder.group({
    userName: ['', Validators.required],
    passWord: ['', Validators.required]
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
        this.loginForm.reset();
        if (err.error.username && err.error.password) {
          this.alertMessageService.error(`${err.error.username} / ${err.error.password}`);
          return
        }
        if (err.error.username) {
          this.alertMessageService.error(err.error.username);
        } else {
          this.alertMessageService.error(err.error.password);
        }
      })
  }
}
