import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import appConstant from '../shared/utils/app.constant';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private http: HttpClient) {}

  getCountries(region?: string): Observable<any> {
    const params = region ? new HttpParams().set('region', region) : undefined;
    return this.http.get<any>(appConstant.URL.COUNTRIES_API, { params });
  }
}
