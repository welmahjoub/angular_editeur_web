import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ApiServiceService} from './services/api-service.service';
import {HttpClientModule} from '@angular/common/http';
import { AddSondageComponent } from './add-sondage/add-sondage.component';
import {ReactiveFormsModule} from '@angular/forms';
import { ListSondageComponent } from './sondage/list-sondage/list-sondage.component';
import { NewSondageComponent } from './sondage/new-sondage/new-sondage.component';
import { ListUserComponent } from './user/list-user/list-user.component';
import { NewUserComponent } from './user/new-user/new-user.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import {RouterModule, Routes} from '@angular/router';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import {AuthService} from './services/auth.service';
import {SondageService} from './services/sondage.service';

const  appRoutes: Routes = [
  { path: 'auth/signup', component : SignupComponent},
  { path: 'auth/signin', component: SigninComponent},
  {path: 'users', component : ListUserComponent },
  {path: 'new-user', component: NewUserComponent},
  {path: 'sondages', component : ListSondageComponent },
  {path: 'new-sondage', component: NewSondageComponent}
  ];

@NgModule({
  declarations: [
    AppComponent,
    AddSondageComponent,
    ListSondageComponent,
    NewSondageComponent,
    ListUserComponent,
    NewUserComponent,
    HeaderComponent,
    FooterComponent,
    SigninComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    ApiServiceService,
    AuthService,
    SondageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
