import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';

 import { MaterialModule } from '@angular/material';
 import { HomeComponent } from './components/home/home.component';
import { SecondComponent } from './components/second/second.component'

// import { FirebaseComponent } from './components/firebase/firebase.component';
// import {
//   AngularFireModule,
//   AuthMethods,
//   AuthProviders
// } from "angularfire2";

// const firebaseConfig = {
//   apiKey: "AIzaSyCdlyXLG8B75rDYQf-N_CtM_cBR8cLHqAQ",
//   authDomain: "teamsomethingcool-54869.firebaseapp.com",
//   databaseURL: "https://teamsomethingcool-54869.firebaseio.com",
//   storageBucket: "teamsomethingcool-54869.appspot.com",
//   messagingSenderId: "553854869745"
// };

@NgModule({
  declarations: [
    HomeComponent,
    SecondComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
     ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: 'sidewinder',
        component: HomeComponent
        ,
        children: [
          {path: '', component: SecondComponent}
        ]
      }
    ]),
   
    MaterialModule.forRoot()
  ],
  exports: [
    RouterModule
  ]
})
export class StandAloneModule { }