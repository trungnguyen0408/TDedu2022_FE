import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Account } from '../models/account';
import { RegisterUser } from '../models/register-user';
import { LocalStorageService } from './localStorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public loggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.loggedIn$.asObservable();
  private REST_API_SERVER = environment.api;

  constructor(private httpClient: HttpClient, private localStorageService: LocalStorageService) {
    const token = this.localStorageService.getToken();
    this.loggedIn$.next(!!token);
  }

  getHeaders() {
    const token = this.localStorageService.getToken();
    return token ? new HttpHeaders().set('Authorization', 'Bearer ' + token) : null;
  }

  public getProfile(): Observable<Account> {
    let headers = this.getHeaders();
    const url = `${this.REST_API_SERVER}/auth/user-profile`;
    if (headers instanceof HttpHeaders)
      return this.httpClient.get<Account>(url, { headers: headers });
    return this.httpClient.get<Account>(url);
  }

  public updateProfile(account: any): Observable<any> {
    const data = {
      username: account.username,
      full_name: account.full_name,
      mobile_phone: account.mobile_phone,
      date_of_birth: account.date_of_birth,
      gender: account.gender,
      address: account.address
    }
    const headers = this.getHeaders();
    const url = `${this.REST_API_SERVER}/auth/update-profile`;
    if (headers instanceof HttpHeaders)
      return this.httpClient.put<any>(url, data, { headers: headers });
    return this.httpClient.put<any>(url, data);
  }

  public changePassword(old_password: string, new_password: string, new_password_confirmation: string): Observable<any> {
    const headers = this.getHeaders();
    const data = {
      old_password: old_password,
      new_password: new_password,
      new_password_confirmation: new_password_confirmation,
    };
    const url = `${this.REST_API_SERVER}/auth/change-pass`;
    if (headers instanceof HttpHeaders)
      return this.httpClient.post<any>(url, data, { headers: headers });
    return this.httpClient.post<any>(url, data);
  }

  public logIn(userName: string, passWord: string): Observable<any> {
    const user = { username: userName, password: passWord }
    const url = `${this.REST_API_SERVER}/auth/login`;
    return this.httpClient.post<any>(url, user);
  }

  public logOut(): Observable<any> {
    const headers = this.getHeaders();
    const url = `${this.REST_API_SERVER}/auth/logout`;
    if (headers instanceof HttpHeaders)
      return this.httpClient.post<any>(url, null, { headers: headers });
    return this.httpClient.post<any>(url, null);
  }

  public forgotPassword(inputValue: string): Observable<any> {
    const data = {
      username: inputValue
    }
    const url = `${this.REST_API_SERVER}/auth/send-reset-password`;
    return this.httpClient.post<any>(url, data);
  }

  public resetPassword(tokenTemp: string, newPassword: string, confirmPassWord: string): Observable<any> {
    const data = {
      token: tokenTemp,
      password: newPassword,
      password_confirmation: confirmPassWord,
    }
    const url = `${this.REST_API_SERVER}/auth/reset-password`;
    return this.httpClient.put<any>(url, data);
  }

  public registerUser(user: RegisterUser): Observable<any> {
    const value = {
      full_name: user.full_name,
      username: user.userName,
      email: user.email,
      mobile_phone: user.mobile_phone,
      gender: user.gender,
      password: user.password,
      password_confirmation: user.password_confirmation,
      date_of_birth: user.day_of_birth
    }
    const url = `${this.REST_API_SERVER}/auth/register`;
    return this.httpClient.post<any>(url, value);
  }
}
