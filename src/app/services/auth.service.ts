import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {User} from '../models/User';
import {HttpClient} from '@angular/common/http';
import {IUser} from '../interfaces/IUser';
import {ISondage} from '../interfaces/ISondage';




@Injectable({
  providedIn: 'root'
})
export class AuthService {

    user: IUser  ;
   isAuth = false;
  authSubject = new Subject<boolean>();
  userSubject = new  Subject<IUser>();

  constructor(private httpService: HttpClient) {
  }

  createNewUser(email: string, password: string) {
  }

  emitUser() {
    this.userSubject.next(this.user);
  }

  emitAuth() {
    this.authSubject.next(this.isAuth);
  }

  signOutIn(auth: boolean) {
     this.isAuth = auth;
     this.emitAuth();
  }



  signOutUser() {
  }

  getListeUsers(): Observable<any> {
    return this.httpService.get<IUser>('/rest/users/');
  }

  signIn(email: string, password: string) {
    return new Promise(
      (resolve , reject) => {
        this.getListeUsers().subscribe(
          (users: IUser[] ) => { users.forEach(
            (user) => {
              if (user.mail === email && user.password === password) {
                console.log(user);
                this.user = user;
                this.isAuth = true;
                this.emitAuth();
                this.emitUser();
                resolve(user);
              }// end if

            }
          ); // end foreach
                                 resolve(false);
          }
        );
      }
    );
    this.emitUser();
    this.emitAuth();
  }

  addUser(u: User): Observable<User> {
    return this.httpService.post<User>('/rest/users/add', u );
  }


}
