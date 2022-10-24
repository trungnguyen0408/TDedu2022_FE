import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RegisterComponent } from '../register/register.component';
import { LocalStorageService } from '../../services/localStorage.service';
import { AlertMessageService } from '../../services/alert-message.service';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private loading: LoadingService, private alertMessageService: AlertMessageService, public dialog: MatDialog, private authService: AuthService, private formBuilder: FormBuilder, private router: Router, private localStorageService: LocalStorageService) {
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

  openDialog() {
    const dialogRef = this.dialog.open(RegisterComponent, {
      width: '500px'
    });
  }

  onLogin() {
    const userName = this.loginForm.value.userName;
    const passWord = this.loginForm.value.passWord;
    this.loading.show();
    this.authService.logIn(userName, passWord).subscribe(data => {
      if (data) {
        this.authService.loggedIn$.next(true);
        this.localStorageService.setToken(data.access_token);
        this.localStorageService.setItem("role", data.role[0]);
        this.localStorageService.setItem("usercurrent", data.user.username);
        this.router.navigate(['/home']);
        this.alertMessageService.success("Login successfull")
        this.loading.hide();
      }
    }, (err) => {
      this.loginForm.reset();
      this.loading.hide();
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
