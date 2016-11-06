import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {  APP_BASE_HREF } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MaterialModule } from '@angular/material';
import { AppRoutingModule }  from './app-routing.module';

import { MainAppModule } from './main_app/main_app.module';
import { FirebaseComponent } from './main_app/components/firebase/firebase.component';
import {
  AngularFireModule,
  AuthMethods,
  AuthProviders
} from "angularfire2";

const firebaseConfig = {
  apiKey: "AIzaSyCdlyXLG8B75rDYQf-N_CtM_cBR8cLHqAQ",
  authDomain: "teamsomethingcool-54869.firebaseapp.com",
  databaseURL: "https://teamsomethingcool-54869.firebaseio.com",
  storageBucket: "teamsomethingcool-54869.appspot.com",
  messagingSenderId: "553854869745"
};

//import { SelectDataFormUrlentryComponent } from './components/select-data-form-urlentry/select-data-form-urlentry.component';



@NgModule({
  declarations: [
    AppComponent,
    FirebaseComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    ReactiveFormsModule,
    MainAppModule,
    AppRoutingModule,
     AngularFireModule.initializeApp(firebaseConfig, {
      provider: AuthProviders.Anonymous, //AuthProviders.Google,
      method: AuthMethods.Anonymous //AuthMethods.Popup
    }),
  ],
  bootstrap: [AppComponent],
  exports:[MaterialModule, 
    FirebaseComponent]
    // ,providers:[{provide: APP_BASE_HREF, useValue: '/'}]
})
export class AppModule { }
