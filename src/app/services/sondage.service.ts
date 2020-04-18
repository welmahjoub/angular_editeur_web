import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {ISondage} from '../interfaces/ISondage';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import {IUser} from '../interfaces/IUser';
import {ISondageDto} from '../interfaces/ISondageDto';
import {Sondage} from "../models/Sondage";

@Injectable({
  providedIn: 'root'
})
export class SondageService {

  user: IUser;

  constructor(private httpService: HttpClient, private  authService: AuthService) {

    this.authService.userSubject.subscribe(
      (user) => {
        this.user = user;
        console.log(this.user);

      });
  }


  // Recuperation de la liste des sondage

  getListeSondage(): Observable<ISondage> {

    return this.httpService.get<ISondage>('/rest/sondage/' + this.user.id );
  }

  // Ajout d'un sondage
  addSondage(sondage): Observable<any> {
    sondage.idUser = this.user.id;
    return this.httpService.post<Sondage>('/rest/sondage/add' , sondage );
  }

  // getUser
  getUser() {
    return this.user;
  }

}
