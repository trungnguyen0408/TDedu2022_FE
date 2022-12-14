import { Component, Injector, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { BaseComponent } from 'src/app/core/components/base.component';
import { APP_MESSAGE } from 'src/app/core/constants/app-message-constant';
import { STATUS_BAN } from 'src/app/core/constants/status-ban-constant';
import { Account } from 'src/app/core/models/account';
import { AuthService } from 'src/app/core/services/auth.service';
import { LocalStorageService } from 'src/app/core/services/localStorage.service';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

@Component({
  selector: 'app-view-profile-page',
  templateUrl: './view-profile-page.component.html',
  styleUrls: ['./view-profile-page.component.scss']
})
export class ViewProfilePageComponent extends BaseComponent implements OnInit {
  account: Account = new Account();
  constructor(injector: Injector, public localStorageService: LocalStorageService, private router: Router, public dialog: MatDialog, private authService: AuthService) {
    super(injector);
  }

  ngOnInit(): void {
    this.showLoader();
    this.authService.getProfile().pipe(finalize(() => {
      this.showLoader(false);
    })).subscribe(data => {
      this.account = data;
      this.account.date_of_birth = this.formatDate(new Date(data.date_of_birth), "MM-DD-YYYY");
    }, (err) => {
      if (err.error[Object.keys(err.error)[0]] ?? '' === STATUS_BAN.UNAUTHORIZED) {
        this.alertMessageService.error(APP_MESSAGE.BANNED);
        this.authService.logOut().subscribe(data => {
          if (data) {
            this.localStorageService.removeAll();
            this.authService.loggedIn$.next(false);
            this.router.navigate(['']);
          }
        });
      }
    })
  }

  onUpdate() {
    const dialogRef = this.dialog.open(EditProfileComponent, {
      width: '500px',
      data: this.account
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        result.date_of_birth = this.formatDate(result.date_of_birth);
        this.showLoader();
        this.authService.updateProfile(result).pipe(finalize(() => {
          this.showLoader(false);
        })).subscribe(data => {
          this.account = data;
          this.account.date_of_birth = this.formatDate(new Date(data.date_of_birth), "MM-DD-YYYY");
          this.alertMessageService.success(APP_MESSAGE.SAVE_SUCCESSFULL);
        }, (err) => {
          if (err.error[Object.keys(err.error)[0]] ?? '' === STATUS_BAN.UNAUTHORIZED) {
            this.alertMessageService.error(APP_MESSAGE.BANNED);
            this.authService.logOut().subscribe(data => {
              if (data) {
                this.localStorageService.removeAll();
                this.authService.loggedIn$.next(false);
                this.router.navigate(['']);
              }
            });
          }
          this.alertMessageService.error(`${err.error[Object.keys(err.error)[0]] ?? ''}`);
        })
      }
    });
  }

  onChange() {
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showLoader();
        this.authService.changePassword(result.old_password, result.new_password, result.new_password_confirmation)
          .pipe(finalize(() => {
            this.showLoader(false);
          }))
          .subscribe(data => {
            this.alertMessageService.success(APP_MESSAGE.CHANGE_PASS_SUCCESSFUL);
          }, (err) => {
            if (err.error[Object.keys(err.error)[0]] ?? '' === STATUS_BAN.UNAUTHORIZED) {
              this.alertMessageService.error(APP_MESSAGE.BANNED);
              this.authService.logOut().subscribe(data => {
                if (data) {
                  this.localStorageService.removeAll();
                  this.authService.loggedIn$.next(false);
                  this.router.navigate(['']);
                }
              });
            }
            this.alertMessageService.error(`${err.error[Object.keys(err.error)[0]] ?? ''}`);
          });
      }
    });
  }
}
