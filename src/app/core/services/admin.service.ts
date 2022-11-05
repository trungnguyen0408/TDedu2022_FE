import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FilterUser } from '../models/filter-user';
import { LocalStorageService } from './localStorage.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private REST_API_SERVER = environment.api;

  constructor(private httpClient: HttpClient, private localStorageService: LocalStorageService) { }

  getHeaders() {
    const token = this.localStorageService.getToken();
    return token ? new HttpHeaders().set('Authorization', 'Bearer ' + token) : null;
  }

  public filterUser(filter: FilterUser): Observable<any> {
    let headers = this.getHeaders();
    const params = new HttpParams().set('filters', JSON.stringify(filter));
    const url = `${this.REST_API_SERVER}/user`;
    if (headers instanceof HttpHeaders)
      return this.httpClient.get<any>(url, { headers: headers, params: params });
    return this.httpClient.get<any>(url);
  }

}
