import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {ISondage} from '../interfaces/ISondage';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import {IParticipant} from '../interfaces/IParticipant';

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {

  participants: IParticipant;
  participantsSubject = new Subject<IParticipant>();
  constructor(private httpService: HttpClient) { }

  emitParticipants() {
    this.getListParticipant().subscribe(
      (partipants) => {
        this.participants = partipants;
        console.log(partipants);
        this.participantsSubject.next(this.participants);
      }
    );

  }

  getListParticipant(): Observable<IParticipant> {
    // return this.httpService.get<ISondage>('/rest/sondage/' + this.user.id );
    return this.httpService.get<IParticipant>('/rest/participants/' );
  }

  deleteParticipant(id: string): Observable<any> {
    // return this.httpService.delete<any>('/rest/sondage/delete/' + JSON.parse(id) ).toPromise();
    return this.httpService.delete<any>('/rest/participants/delete/' + id);
  }
}
