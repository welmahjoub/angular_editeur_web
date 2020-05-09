import { Injectable } from '@angular/core';
import {IParticipant} from '../interfaces/IParticipant';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { IUser } from '../interfaces/IUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: IUser;
  usersSubject = new Subject<IUser>();
  constructor(private httpService: HttpClient) { }

  emitUsers() {
    this.getListUser().subscribe(
      (users) => {
        this.users = users;
        console.log(users);
        this.usersSubject.next(this.users);
      }
    );

  }

  getListUser(): Observable<IUser> {
    // return this.httpService.get<ISondage>('/rest/sondage/' + this.user.id );
    return this.httpService.get<IUser>('/rest/users/' );
  }

  deleteUser(id: string): Observable<any> {
    // return this.httpService.delete<any>('/rest/sondage/delete/' + JSON.parse(id) ).toPromise();
    return this.httpService.delete<any>('/rest//users/delete/' + id);
  }
}
