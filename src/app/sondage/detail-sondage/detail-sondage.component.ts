import { Component, OnInit } from '@angular/core';
import {SondageService} from '../../services/sondage.service';
import {Router, ActivatedRoute} from '@angular/router';
import { ISondage } from 'src/app/interfaces/ISondage';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Subject} from 'rxjs';
import {Participant} from '../../models/Participant';
import {HttpClient} from "@angular/common/http";
registerLocaleData(localeFr, 'fr');

@Component({
  selector: 'app-detail-sondage',
  templateUrl: './detail-sondage.component.html',
  styleUrls: ['./detail-sondage.component.css']
})
export class DetailSondageComponent implements OnInit {

  validerDateForm: FormGroup;
  dates = [];
  sondageSubject = new  Subject<ISondage>();
  sondage: ISondage;
  constructor( private formBuilder: FormBuilder,
               private authService: AuthService,
               private route: ActivatedRoute,
               private sondageService: SondageService,
               private router: Router,
               private  http: HttpClient) {

  }

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    this.initForm();
    this.sondageService.getSondage(id).subscribe(
      (sond: ISondage) => {
        this.sondage = sond;
        this.emitSondage();
        console.log(sond);
      }
      );
    this.emitSondage();
  }

  private initForm() {
    this.validerDateForm = this.formBuilder.group({
      date: ['']
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
    const idDateChoisie = this.validerDateForm.get('date').value;
    console.log(this.validerDateForm.value);
    this.sondageService.validerDate(idDateChoisie).subscribe(
      (res) => {
        console.log(res);
        this.onBack();
      }
    );
  }

  openPad(idSondage: string) {
    return this.http.get<ISondage>('/pad/p/' + idSondage );
  }

  onBack() {
    this.router.navigate(['/sondages']);
  }

}
