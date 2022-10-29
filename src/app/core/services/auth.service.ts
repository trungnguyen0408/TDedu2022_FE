import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RegisterUser } from '../models/register-user';
import { LocalStorageService } from './localStorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public loggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.loggedIn$.asObservable();
  private REST_API_SERVER = environment.api;

  constructor(private httpClient: HttpClient, private router: Router, private localStorageService: LocalStorageService) {
    const token = this.localStorageService.getItem('token');
    this.loggedIn$.next(!!token);
  }

  getHeaders() {
    const token = this.localStorageService.getItem('token');
    return token ? new HttpHeaders().set('Authorization', 'Bearer ' + token) : null;
  }

  public getProfile(): Observable<any> {
    let headers = this.getHeaders();
    const url = `${this.REST_API_SERVER}/auth/user-profile`;
    if (headers instanceof HttpHeaders)
      return this.httpClient.get<any>(url, { headers: headers });
    return this.httpClient.get<any>(url);
  }

  public logIn(userName: string, passWord: string): Observable<any> {
    const user = { username: userName, password: passWord }
    const url = `${this.REST_API_SERVER}/auth/login`;
    return this.httpClient.post<any>(url, user);
  }

  public logOut(): Observable<any> {
    let headers = this.getHeaders();
    const url = `${this.REST_API_SERVER}/auth/logout`;
    if (headers instanceof HttpHeaders)
      return this.httpClient.post<any>(url, null, { headers: headers });
    return this.httpClient.post<any>(url, null);
  }

  public forgotPassword(inputValue: string): Observable<any> {
    const url = `${this.REST_API_SERVER}/auth/send-reset-password`;
    return this.httpClient.post<any>(url, inputValue);
  }

  public registerUser(user: RegisterUser): Observable<any> {
    const value = {
      full_name: user.full_name,
      username: user.userName,
      email: user.email,
      mobile_phone: user.mobile_phone,
      gender: user.gender,
      password: user.password,
      password_confirmation: user.password_confirmation
    }
    const url = `${this.REST_API_SERVER}/auth/register`;
    return this.httpClient.post<any>(url, value);
  }
}
