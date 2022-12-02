import { Component, Inject, Injector, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { findIndex, map } from 'rxjs';
import { BaseComponent } from 'src/app/core/components/base.component';
import { AccountUser } from 'src/app/core/models/account-user';
import { BanHistory } from 'src/app/core/models/ban-history';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-preview-page',
  templateUrl: './preview-page.component.html',
  styleUrls: ['./preview-page.component.scss']
})
export class PreviewPageComponent extends BaseComponent implements OnInit {
  user: AccountUser = new AccountUser();
  ban: BanHistory = new BanHistory();  
  banHistory: string = '';  
  constructor(injector: Injector, public dialogRef: MatDialogRef<PreviewPageComponent>, private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    super(injector);
  }

  ngOnInit(): void {
    this.user = this.data;
    this.user.date_of_birth = this.formatDate(new Date(this.data.date_of_birth), "MM-DD-YYYY");
    this.getBannerHistory(this.data.id);
  }

  getBannerHistory(id: string): void {
    this.userService.getBannedHistory(id).subscribe(
      (res) => {
        if (res.length>0) {
          this.ban.created_at = res.created_at;;
          this.ban.duration = res.duration;
          this.ban.comment = res.comment;
          console.log(res);
          for (let index = 0; index < res.length; index++) {
            const stt = index + 1;
            this.banHistory +=
              `<strong>NO.` + stt + `</strong><p> Time:` + this.formatDate(new Date(res[index]["created_at"]), "MM-DD-YYYY") + `</p>
              <p> Ban Duration: ` + res[index]["duration"] + ` </p>
              <p> Resion: ` + res[index]["comment"] + ` </p>`;
          }   
        } else {
          this.banHistory +=
            `<strong> No ban hítory </strong>`;
          return;
        }
        
      },
      (err) => {
        console.log(err)
      }
    )


  }
}
