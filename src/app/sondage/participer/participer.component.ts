import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {SondageService} from '../../services/sondage.service';

@Component({
  selector: 'app-participer',
  templateUrl: './participer.component.html',
  styleUrls: ['./participer.component.css']
})
export class ParticiperComponent implements OnInit {

  participeForm: FormGroup;
  errorMessage: string;
  idSondage: string;
  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private  sondageService: SondageService) { }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.participeForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    console.log('Yes it submit');
  }
}
