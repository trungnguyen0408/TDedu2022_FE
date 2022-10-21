import { Component } from '@angular/core';
import { Role } from './core/enums/role';
import { AuthService } from './core/services/auth.service';
import { LocalStorageService } from './core/services/localStorage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'ClientApp';
  constructor(public authService: AuthService, public localStorageService: LocalStorageService) { }
  public ngOnInit() {
  }
  getRole() {
    return Role;
  }
}
