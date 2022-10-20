import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(public dialog: MatDialog, private authService: AuthService, private formBuilder: FormBuilder, private router: Router) {
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
    }
    if (this.account.userName === 'admin' && this.account.passWord === '123') {
      this.authService.login(this.account);
    }
  }
}
