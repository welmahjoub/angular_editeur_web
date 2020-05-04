import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SondageService} from '../../services/sondage.service';
import {ISondage} from '../../interfaces/ISondage';
import {Subject} from "rxjs";
import {IUser} from "../../interfaces/IUser";

@Component({
  selector: 'app-participer',
  templateUrl: './participer.component.html',
  styleUrls: ['./participer.component.css']
})
export class ParticiperComponent implements OnInit {

  participeForm: FormGroup;
  errorMessage: string;
  idSondage: string;
  sondage: ISondage;
  sondageSubject = new  Subject<ISondage>();

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
        console.log(this.sondage);

        // Ajout dynamique des radios dans le formulaire ça marche aussi
        // this.sondage.dateProposees.forEach(
        //   (date) => {
        //     const  d = new FormControl(null);
        //     d.setValue(date);
        //     this.getDates().push(d);
        //   }
        // );
        console.log(this.getDates().value);

      }
    );
    this.emitSondage();
    this.updateDate();
    this.sondageSubject.subscribe(
      (sond) => {console.log(sond); }
    );
    console.log(this.sondage);
  }

  private initForm() {
    this.participeForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dates : this.formBuilder.array([])
    });
  }

  emitSondage() {
    this.sondageSubject.next(this.sondage);
  }

  updateDate() {
    const dates = new FormArray([]);
    this.sondageSubject.subscribe(
      (sond) => {
        sond.dateProposees.forEach(
          (date) => {
            const  d = new FormControl(null);
            d.setValue(date);
            dates.push(d);
          }
        );
        this.participeForm.setControl('dates', dates);
      }
    );
    // this.participeForm.setControl('dates', dates);
  }

  getDates() {
    return this.participeForm.get('dates') as FormArray ;
  }

  onAddDate() {
    const newDate = this.formBuilder.control(null, Validators.required);
    this.getDates().push(newDate);
  }

  onSubmit() {
    console.log(this.participeForm.value);
  }
}
