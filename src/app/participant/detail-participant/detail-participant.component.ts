import { Component, OnInit } from '@angular/core';
import {IParticipant} from '../../interfaces/IParticipant';
import {ActivatedRoute, Router} from '@angular/router';
import {ParticipantService} from '../../services/participant.service';

@Component({
  selector: 'app-detail-participant',
  templateUrl: './detail-participant.component.html',
  styleUrls: ['./detail-participant.component.css']
})
export class DetailParticipantComponent implements OnInit {

  participant: IParticipant;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private participantService: ParticipantService) {
  }

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    this.participantService.getParticipant(id).subscribe(
      (participant) => {

        console.log(participant);
        this.participant = participant;
      }
    );
  }

  onBack() {
    this.router.navigate(['/participants']);
  }

}
