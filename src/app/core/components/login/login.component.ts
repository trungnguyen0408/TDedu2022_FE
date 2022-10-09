import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(public dialog: MatDialog, private authService: AuthService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  public loginForm = this.formBuilder.group({
    userName: ['', Validators.required],
    passWord: ['', Validators.required],
    role: ['admin']
  });
  public account: any = {
    userName: '',
    passWord: ''
  };
  openDialog() {
    const dialogRef = this.dialog.open(RegisterComponent, {
      width: '500px'
    });
  }
  onLogin() {
    this.account = {
      userName: this.loginForm.value.userName,
      passWord: this.loginForm.value.passWord,
      role: this.loginForm.value.role
    }
    if (this.account.userName === 'admin' && this.account.passWord === '123') {
      this.authService.login(this.account);
      this.authService.isLoggedIn();
    }
  }
}
