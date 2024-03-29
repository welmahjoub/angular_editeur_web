import { Component, OnInit } from '@angular/core';
import {SondageService} from '../../services/sondage.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Sondage} from '../../models/Sondage';
import {AuthService} from '../../services/auth.service';
import {IUser} from '../../interfaces/IUser';
import {DatePipe} from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr, 'fr');

@Component({
  selector: 'app-edit-sondage',
  templateUrl: './edit-sondage.component.html',
  styleUrls: ['./edit-sondage.component.css']
})
export class EditSondageComponent implements OnInit {
  user: IUser;
  id: string;
  sondage: any;
  sondageForm: FormGroup;
  errorMessage: string;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private sondageService: SondageService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.authService.emitUser();
    this.id = this.route.snapshot.params.idSond;
    this.sondageService.getSondage(this.id).subscribe(
      (sondage) => {
        this.sondage = sondage;
        console.log(this.sondage);
        console.log(this.sondage.dateProposees.dates);
      }
    );
    this.user = this.sondageService.getUser();
    this.initForm();
  }

  initForm() {
    this.sondageForm = this.formBuilder.group({
      resume : [ '', Validators.required],
      intitule : [ '', Validators.required],
      dates : this.formBuilder.array([])
    });
  }

  onSubmit() {
    const resume = this.sondageForm.get('resume').value;
    const intitule = this.sondageForm.get('intitule').value;
    const dates = this.sondageForm.get('dates').value;
    console.log(this.sondageForm.value);

    // const sondage = new Sondage(resume, intitule, this.user.id.toString(), allDates);
    // const sondage = new Sondage(resume, intitule, '2', allDates);
    const sondage = new Sondage(resume, intitule, '2', dates);

    this.sondageService.editSondage(this.id, sondage).subscribe(
      (res ) => {
        console.log(res);
        // Si la modif a été effectuée emettre la liste pour rafraichir la celle-ci dans le component list-sondage
        if (res) {
          this.sondageService.emitSondage();
        }
        this.onBack();
      }
    );
  }




  getDates() {
    return this.sondageForm.get('dates') as FormArray ;
  }

  onAddDate() {
    const newDate = this.formBuilder.control(null, Validators.required);
    this.getDates().push(newDate);
  }

  onBack() {
    this.router.navigate(['/sondages']);
  }

  recupererAncienneDateAvecNew() {

    const dates = this.sondageForm.get('dates').value;
    const allDates: string[] = [];

    console.log(this.sondage.dateProposees);
    this.sondage.dateProposees.forEach(
      (elem) => {
        allDates.push(elem.date);
      }
    ) ;
    console.log(allDates);
    dates.forEach(
      (d) => {
        allDates.push(d);
      }
    );

    console.log(allDates);
  }

}
