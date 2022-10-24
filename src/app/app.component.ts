import { Component } from '@angular/core';
import { Role } from './core/enums/role';
import { AuthService } from './core/services/auth.service';
import { LoadingService } from './core/services/loading.service';
import { LocalStorageService } from './core/services/localStorage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'ClientApp';
  isLoading = this.loaderService.loading;
  constructor(private loaderService: LoadingService, public authService: AuthService, public localStorageService: LocalStorageService) { }
  public ngOnInit() {
  }
  getRole() {
    return Role;
  }
}
