import { Component, OnInit } from '@angular/core';
import {ISondage} from '../../interfaces/ISondage';
import {IParticipant} from '../../interfaces/IParticipant';
import {Subscription} from 'rxjs';
import {ParticipantService} from '../../services/participant.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list-participant',
  templateUrl: './list-participant.component.html',
  styleUrls: ['./list-participant.component.css']
})
export class ListParticipantComponent implements OnInit {

participants: IParticipant;
participantsSubscription: Subscription;

  constructor(private participantService: ParticipantService,
              private router: Router) {}

  ngOnInit() {
    this.participantsSubscription = this.participantService.participantsSubject.subscribe(
      (participants)  => {
        this.participants = participants;
      }
    );

    this.participantService.emitParticipants();
  }


  onViewSondage(participant: IParticipant) {
    this.router.navigate(['/detail-participant', participant.id]);
  }

  onDeleteSondage(id) {
    this.participantService.deleteParticipant(id).subscribe(
      (res) => {
        console.log(res.toString());
        // Si la suppression a été effectuée emettre la liste pour rafraichir la celle-ci dans le component list-sondage
        if (res) {
          this.participantService.emitParticipants();
        }
        // this.router.navigate(['/sondages']);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onUpdateSondage(sondage: ISondage) {
  }

  ngOnDestroy() {
  }

}
