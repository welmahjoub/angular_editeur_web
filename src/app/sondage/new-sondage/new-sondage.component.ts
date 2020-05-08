import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Sondage} from '../../models/Sondage';
import {SondageService} from '../../services/sondage.service';

@Component({
  selector: 'app-new-sondage',
  templateUrl: './new-sondage.component.html',
  styleUrls: ['./new-sondage.component.css']
})
export class NewSondageComponent implements OnInit {

  sondageForm: FormGroup;
  errorMessage: string;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private  sondageService: SondageService ) { }

  ngOnInit() {
    this.initForm();
    // Permet recuperer le parametre id passé dans l'url
    /*const user = this.route.snapshot.params.idUser;
    console.log(user);*/

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

    const sondage = new Sondage(resume, intitule, ' ', dates);

    this.sondageService.addSondage(sondage).then(
      (res) => {
        console.log(res);
        // Si l'ajout a été effectué emettre la liste pour rafraichir la celle-ci dans le component list-sondage
        if (res) {
          this.sondageService.emitSondage();
        }
        this.onBack();
      },
      (error) => {
        console.log(error);
      }
        );
    this.router.navigate(['/sondages']);
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


}
