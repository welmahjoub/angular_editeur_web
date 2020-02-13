import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private httpService: HttpClient) { }

  getListeUsers(): Observable<any> {
      return this.httpService.get<any>('localhost:8081/rest/users/');
  }
}
