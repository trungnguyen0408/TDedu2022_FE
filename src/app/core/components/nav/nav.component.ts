import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  public isLoggedIn$: Observable<boolean> = new Observable<boolean>();

  constructor(private AuthService: AuthService) { }

  public ngOnInit() {
    this.isLoggedIn$ = this.AuthService.isLoggedIn();
  }

  public onLogout() {
    this.AuthService.logout();
  }

}
