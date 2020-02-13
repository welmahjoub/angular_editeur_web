import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from './model/User';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private httpService: HttpClient) { }

  getListeUsers(): Observable<any> {
      return this.httpService.get<any>('/rest/users/');
  }

  addUser(u: User): Observable<User> {
    return this.httpService.post<User>('/rest/users/add', u );
  }
}
