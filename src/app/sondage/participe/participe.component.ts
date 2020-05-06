import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SondageService} from '../../services/sondage.service';
import {ISondage} from '../../interfaces/ISondage';
import {Participant} from '../../models/Participant';
import {Subject} from 'rxjs';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr, 'fr');

@Component({
  selector: 'app-participe',
  templateUrl: './participe.component.html',
  styleUrls: ['./participe.component.css']
})
export class ParticipeComponent implements OnInit {

  participeForm: FormGroup;
  errorMessage: string;
  idSondage: string;
  sondage: ISondage;
  sondageSubject = new  Subject<ISondage>();
  dates = [];

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private  sondageService: SondageService) { }

  ngOnInit() {
    this.idSondage = this.route.snapshot.params.id;
    this.initForm();
    this.sondageService.getSondage(this.idSondage).subscribe(
      (sondage) => {
        this.sondage = sondage;
        this.emitSondage();
      }
    );
    this.emitSondage();
    console.log(this.dates);
  }
  private initForm() {
    this.participeForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dates: ['']
      // dates: ['']
      // dates : this.formBuilder.array([])
    });
  }

  emitSondage() {
    this.sondageSubject.next(this.sondage);

    // Mise à jour du tableau de dates
    this.sondageSubject.subscribe(
      (sondage) => {
        sondage.dateProposees.forEach(
          (date) => {
            this.dates.push(date);
          }
        );
      }
    );
  }

  onSubmit() {
    const nom = this.participeForm.get('firstName').value;
    const prenom = this.participeForm.get('lastName').value;
    const email = this.participeForm.get('email').value;
    const idDateChoisie = this.participeForm.get('dates').value;
    const participant = new Participant( nom, prenom, email, idDateChoisie)
    this.sondageService.participerSondage(participant).subscribe(
      (res) => {
        console.log(res);
        this.onBack();
      }
    );
    console.log(this.participeForm.value);
  }
  onBack() {
    this.router.navigate(['/sondages']);
  }

}
