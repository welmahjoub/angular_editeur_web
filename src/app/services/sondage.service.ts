import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {ISondage} from '../interfaces/ISondage';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import {IUser} from '../interfaces/IUser';
import {Sondage} from '../models/Sondage';

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

  // edittion d'un sondage
  editSondage(idSond: string , sondageU: Sondage): Observable<any> {

    // let data = {limit: "2"};
    // this.httpClient.get<any>(apiUrl, {params: data});
      const data = {id: idSond, sondage: sondageU};
      // return this.httpService.put<any>('/rest/sondage/edit/' + idSond, {params: data});
      return this.httpService.put<any>('/rest/sondage/edit/' + idSond, sondageU);
  }


  // Recuperation d'une sondage avec son id
  getSondage(id): Observable<ISondage> {
    return this.httpService.get<ISondage>('/rest/sondage/get/' + id);
  }

  // Recuperation d'une sondage avec son id
  removeSondage(id): Observable<any> {
    return this.httpService.delete<any>('/rest/sondage/delete/' + JSON.parse(id));
  }


  // getUser
  getUser() {
    return this.user;
  }

}
