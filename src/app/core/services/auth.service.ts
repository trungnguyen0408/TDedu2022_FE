import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.loggedIn$.asObservable();
  private REST_API_SERVER = environment.api;

  constructor(private httpClient: HttpClient, private router: Router) {
    const token = localStorage.getItem('token');
    this.loggedIn$.next(!!token);
  }

  getHeaders() {
    const token = localStorage.getItem('token');
    return token ? new HttpHeaders().set('Authorization', 'Bearer ' + token) : null;
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  removeToken() {
    localStorage.removeItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  public logout() {
    this.removeToken();
    this.loggedIn$.next(false);
    this.router.navigate(['']);
  }

  public login(account: any): void {
    if (account) {
      this.loggedIn$.next(true);
      this.setToken(account.userName)
      this.router.navigate(['/student']);
    }
  }

  public getProfile(userName: string): Observable<any> {
    let headers = this.getHeaders();
    const url = `${this.REST_API_SERVER}/api/Account/` + userName;
    if (headers instanceof HttpHeaders)
      return this.httpClient.get<any>(url, { headers: headers });
    return this.httpClient.get<any>(url);
  }
}
