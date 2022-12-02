import { Component, Inject, Injector, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { finalize } from 'rxjs';
import { BaseComponent } from 'src/app/core/components/base.component';
import { AccountUser } from 'src/app/core/models/account-user';
import { BanHistoryUser } from 'src/app/core/models/ban-history-user';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-preview-page',
  templateUrl: './preview-page.component.html',
  styleUrls: ['./preview-page.component.scss']
})
export class PreviewPageComponent extends BaseComponent implements OnInit {
  user: AccountUser = new AccountUser();
  listBanHistory: BanHistoryUser[] = [];

  constructor(injector: Injector, private userService: UserService, public dialogRef: MatDialogRef<PreviewPageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    super(injector);
  }

  ngOnInit(): void {
    this.user = this.data;
    this.user.duration = this.data.is_ban ? this.data.is_ban.duration : '';
    this.user.reasonBan = this.data.is_ban ? this.data.is_ban.comment : '';
    this.user.date_of_birth = this.formatDate(new Date(this.data.date_of_birth), "MM-DD-YYYY");
  }

  onClickTab(item: any) {
    if (item.index === 1) {
      this.showLoader();
      this.userService.getBanHistory(this.data.id).pipe(finalize(() => {
        this.showLoader(false);
      })).subscribe((response) => {
        if (response.length > 0) {
          this.listBanHistory = [];
          response.forEach(element => {
            let banHistory = new BanHistoryUser();
            banHistory.time = this.formatDate(element.created_at);
            banHistory.ban_duration = element.duration;
            banHistory.reason = element.comment;

            this.listBanHistory.push(banHistory);
          });
        }
      })
    }
  }
}
