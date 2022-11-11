import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent extends BaseComponent implements OnInit {
  public forgotForm = this.formBuilder.group({
    confirmPassWord: [''],
    passWord: ['']
  });
  tokenTemp: string = '';

  constructor(injector: Injector, private route: ActivatedRoute, private authService: AuthService, private formBuilder: FormBuilder, private router: Router) {
    super(injector);
    this.route.queryParams.subscribe(params => {
      this.tokenTemp = params['token'];
    });

    if (!this.tokenTemp) {
      this.router.navigate(['']);
    }
  }

  ngOnInit(): void {
  }

  onForgot() {
    this.showLoader();
    this.authService.resetPassword(this.tokenTemp, this.forgotForm.value.passWord, this.forgotForm.value.confirmPassWord).pipe(finalize(() => {
      this.showLoader(false);
    })).subscribe(data => {
      if (data) {
        this.alertMessageService.success(data.message);
        this.onBackLogin();
      }
    }, (err) => {
      this.alertMessageService.error(`${err.error.password[0] ?? ''}`);
    })
  }

  onBackLogin() {
    this.router.navigate(['/login']);
  }
}
