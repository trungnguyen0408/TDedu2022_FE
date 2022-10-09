import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public isLoggedIn$: Observable<boolean> = new Observable<boolean>();
  title = 'ClientApp';
  constructor(private AuthService: AuthService) { }
  public ngOnInit() {
    this.isLoggedIn$ = this.AuthService.isLoggedIn();
  }
}
