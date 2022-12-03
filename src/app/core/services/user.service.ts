import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FilterUser } from '../models/filter-user';
import { LocalStorageService } from './localStorage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private REST_API_SERVER = environment.api;

  constructor(private httpClient: HttpClient, private localStorageService: LocalStorageService) { }

  getHeaders() {
    const token = this.localStorageService.getToken();
    return token ? new HttpHeaders().set('Authorization', 'Bearer ' + token) : null;
  }

  public filter(filter: FilterUser): Observable<any> {
    let headers = this.getHeaders();
    const params = new HttpParams()
      .set('page', filter.page)
      .set('limit', filter.limit)
      .set('role', filter.role)
      .set('created_from', filter.created_from)
      .set('created_to', filter.created_to)
      .set('email', filter.email)
      .set('full_name', filter.fullName)
      .set('status', filter.status)
      .set('sort_name', filter.sort_name)
      .set('sort_type', filter.sort_type);

    const url = `${this.REST_API_SERVER}/user`;
    if (headers instanceof HttpHeaders)
      return this.httpClient.get<any>(url, { headers: headers, params: params });
    return this.httpClient.get<any>(url);
  }

  public getById(id: string): Observable<any> {
    let headers = this.getHeaders();
    const url = `${this.REST_API_SERVER}/user/${id}`;
    if (headers instanceof HttpHeaders)
      return this.httpClient.get<any>(url, { headers: headers });
    return this.httpClient.get<any>(url);
  }

  public update(item: any, id: string): Observable<any> {
    const data = {
      username: item.username,
      full_name: item.full_name,
      address: item.address,
      mobile_phone: item.mobile_phone,
      date_of_birth: item.date_of_birth,
      gender: item.gender,
      role: item.role,
      status: item.status,
      duration: item.duration,
      reason_ban: item.reasonBan
    }
    const headers = this.getHeaders();
    const url = `${this.REST_API_SERVER}/user/${id}`;
    if (headers instanceof HttpHeaders)
      return this.httpClient.put<any>(url, data, { headers: headers });
    return this.httpClient.put<any>(url, data);
  }

  public create(item: any): Observable<any> {
    const data = {
      email: item.email,
      username: item.username,
      address: item.address,
      full_name: item.full_name,
      mobile_phone: item.mobile_phone,
      date_of_birth: item.date_of_birth,
      gender: item.gender,
      role: item.role
    }
    const headers = this.getHeaders();
    const url = `${this.REST_API_SERVER}/user`;
    if (headers instanceof HttpHeaders)
      return this.httpClient.post<any>(url, data, { headers: headers });
    return this.httpClient.post<any>(url, data);
  }

  public delete(id: string): Observable<any> {
    let headers = this.getHeaders();
    const url = `${this.REST_API_SERVER}/user/${id}`;
    if (headers instanceof HttpHeaders)
      return this.httpClient.delete<any>(url, { headers: headers });
    return this.httpClient.delete<any>(url);
  }

  public bulkDelete(ids: string[]): Observable<any> {
    let data = {
      user_ids: ids
    }
    let headers = this.getHeaders();
    const url = `${this.REST_API_SERVER}/bulk-delete-user`;
    if (headers instanceof HttpHeaders)
      return this.httpClient.delete<any>(url, { headers: headers, body: data });
    return this.httpClient.delete<any>(url);
  }

  public exportAll(): Observable<any> {
    let headers = this.getHeaders();
    const url = `${this.REST_API_SERVER}/export-all-user`;

    if (headers instanceof HttpHeaders)
      return this.httpClient.get<any>(url, { headers: headers, responseType: 'blob' as 'json' });
    return this.httpClient.get<any>(url);
  }

  public bulkExport(ids: string[]): Observable<any> {
    let headers = this.getHeaders();
    let params = new HttpParams();
    for (const id of ids) {
      params = params.append('user_ids[]', id);
    }
    const url = `${this.REST_API_SERVER}/export-user`;
    if (headers instanceof HttpHeaders)
      return this.httpClient.get<any>(url, { headers: headers, params: params, responseType: 'blob' as 'json' });
    return this.httpClient.get<any>(url);
  }

  public getBanHistory(idUser: string): Observable<any> {
    let headers = this.getHeaders();
    const url = `${this.REST_API_SERVER}/ban-history/${idUser}`;
    if (headers instanceof HttpHeaders)
      return this.httpClient.get<any>(url, { headers: headers });
    return this.httpClient.get<any>(url);
  }
}
