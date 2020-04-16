import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {ISondage} from '../interfaces/ISondage';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import {IUser} from '../interfaces/IUser';

@Injectable({
  providedIn: 'root'
})
export class SondageService {

  user: IUser;

  constructor(private httpService: HttpClient, private  authService: AuthService) { }

  // Sondage
  list: Observable<ISondage>;

  getListeSondage(): Observable<ISondage> {

    this.list = new Observable<ISondage>();

    return this.httpService.get<ISondage>('/rest/sondage/2' );
    /*this.authService.userSubject.subscribe(
      (user) => {
        this.user = user;
        console.log(this.user);
        this.list = this.httpService.get<ISondage>('/rest/sondage/2' );
        this.list.subscribe(res => console.log(this.list));
        console.log(this.list);
      }
  );
    return this.list;*/
  }
}
