import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ApiServiceService} from '../services/api-service.service';
import {Observable} from 'rxjs';
import {User} from '../models/User';

@Component({
  selector: 'app-add-sondage',
  templateUrl: './add-sondage.component.html',
  styleUrls: ['./add-sondage.component.css']
})
export class AddSondageComponent implements OnInit {
  checkoutForm: any;

  constructor(private formBuilder: FormBuilder, private api: ApiServiceService) {
    this.checkoutForm = this.formBuilder.group({
      titre: '',
      resume: '',
      lieu: '',
      nom: '',
      prenom: '',
      mail: ''
    });
  }

  ngOnInit() {
  }

  onSubmit(data) {
    const  u = new User(data.nom, data.prenom, data.mail);
    const  user: Observable<User> = this.api.addUser(u);
    user.subscribe(res => {
      console.log(res);
    }
    );
  }

}
