import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RegisterComponent } from '../register/register.component';
import { ErrorStateMatcher } from '@angular/material/core';
import { LocalStorageService } from '../../services/localStorage.service';
import { AlertMessageService } from '../../services/alert-message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private alertMessageService: AlertMessageService, public dialog: MatDialog, private authService: AuthService, private formBuilder: FormBuilder, private router: Router, private localStorageService: LocalStorageService) {
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

    this.authService.logIn(userName, passWord).subscribe(data => {
      if (data) {
        this.alertMessageService.success("Login successfull")
        setTimeout(() => {
          this.authService.loggedIn$.next(true);
          this.localStorageService.setToken(data.access_token);
          this.localStorageService.setItem("role", data.role[0]);
          this.router.navigate(['/home']);
        }, 2000);
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
