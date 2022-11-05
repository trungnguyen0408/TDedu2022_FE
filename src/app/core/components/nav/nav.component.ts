import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LocalStorageService } from '../../services/localStorage.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(public authService: AuthService, public localStorageService: LocalStorageService, private router: Router) { }

  ngOnInit() { }

  onLogout() {
    this.authService.logOut().subscribe(data => {
      if (data) {
        this.localStorageService.removeAll();
        this.authService.loggedIn$.next(false);
        this.router.navigate(['']);
      }
    });
  }

  onViewProfile(){
    this.router.navigate(['/view-profile']);
  }
}
