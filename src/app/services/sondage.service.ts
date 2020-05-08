import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {ISondage} from '../interfaces/ISondage';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from './auth.service';
import {IUser} from '../interfaces/IUser';
import {Sondage} from '../models/Sondage';
import {Participant} from '../models/Participant';
import {Text} from "@angular/compiler";

@Injectable({
  providedIn: 'root'
})
export class SondageService {

  user: IUser;
  sondages: ISondage;
  sondagesSubject = new Subject<ISondage>();

  constructor(private httpService: HttpClient, private  authService: AuthService) {

    this.authService.userSubject.subscribe(
      (user) => {
        this.user = user;
        console.log(this.user);

      });

    // this.emitSondage();

  }

  emitSondage() {
    this.getListeSondage().subscribe(
      (sondages) => {
        this.sondages = sondages;
        console.log(sondages);
        this.sondagesSubject.next(this.sondages);
      }
    );

  }


  // Recuperation de la liste des sondage

  getListeSondage(): Observable<ISondage> {

    // return this.httpService.get<ISondage>('/rest/sondage/' + this.user.id );
    return this.httpService.get<ISondage>('/rest/sondage/2' );
  }

  // Ajout d'un sondage
  // addSondage(sondage): Observable<any> {
  addSondage(sondage): Promise<any> {
    // sondage.idUser = this.user.id;
    sondage.idUser = 2;
    return this.httpService.post<Sondage>('/rest/sondage/add' , sondage ).toPromise();
  }

  // edittion d'un sondage
  editSondage(idSond: string , sondageU: Sondage): Observable<any> {
      return this.httpService.put<Sondage>('/rest/sondage/edit/' + idSond, sondageU);
  }


  // Recuperation d'une sondage avec son id
  getSondage(id): Observable<ISondage> {
    return this.httpService.get<ISondage>('/rest/sondage/get/' + id);
  }

  // Recuperation d'une sondage avec son id
  removeSondage(id: string): Observable<any> {
    // return this.httpService.delete<any>('/rest/sondage/delete/' + JSON.parse(id) ).toPromise();
    return this.httpService.delete<any>('/rest/sondage/delete/' + id);
  }

  // Participation à un sondage : Voter pour un date precise
  participerSondage(participant: Participant): Observable<any> {
    return this.httpService.post<Sondage>('/rest/sondage/participer' , participant);
  }

  // Valider une date final pour la reunion
  validerDate(id: string): Observable<any> {
    return this.httpService.post<any>('/rest/sondage/valider/' + JSON.parse(id), '');
  }


  // getUser
  getUser() {
    return this.user;
  }

}
