import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {User} from '../models/User';
import {HttpClient} from '@angular/common/http';
import {IUser} from '../interfaces/IUser';




@Injectable({
  providedIn: 'root'
})
export class AuthService {

   private user: IUser  ;
  private isAuth = false;
  authSubject = new Subject<boolean>();
  userSubject = new  Subject<IUser>();

  constructor(private httpService: HttpClient) { }

  createNewUser(email: string, password: string) {
  }

  emitUser() {
    this.userSubject.next(this.user);
  }

  emitAuth() {
    this.authSubject.next(this.isAuth);
  }

  signOut(auth: boolean) {
     this.isAuth = auth;
     this.emitAuth();
  }


  signInUser(email: string, password: string) {
  }

  signOutUser() {
  }

  getListeUsers(): Observable<any> {
    return this.httpService.get<IUser>('/rest/users/');
  }

  isExistUser1(email: string, password: string) {
    this.getListeUsers().subscribe(

      (res: IUser[]) => { res.forEach(
        (user) => { if ( user.mail === email && user.password === password) {
          this.user = user;
        } }
      );
      },
      (eror) => {
        return false;
      }

    );
  }

  isExistUser(email: string, password: string) {
    return new Promise(
      (resolve , reject) => {
        this.getListeUsers().subscribe(
          (users: IUser[] ) => { users.forEach(
            (user) => {
              if (user.mail === email && user.password === password) {
                console.log(user);
                this.user = user;
                this.isAuth = true;
                resolve(user);
              }// end if

            }
          ); // end foreach
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
