import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { ViewComponent } from './components/view/view.component';
import { PlotComponent } from './components/plot/plot.component';
import { DemoPageComponent } from './components/demo-page/demo-page.component';
import { RecordsComponent } from './components/records/records.component';

import { SelectDataFormComponent } from './components/select-data-form/select-data-form.component';
import { ChartSelector } from './components/demo-page/chart-selector'
import { nvD3 } from 'ng2-nvd3';

import { AnameComponent } from './components/aname/aname.component';
import { SampleFormComponent } from './components/sample-form/sample-form.component';
import { PropertyTypeConvertPipe } from './pipes/property-type-convert.pipe';
 import { MaterialModule } from '@angular/material';

import { ApiService } from './services/api.service';
import { IsArrayPipe } from './pipes/is-array.pipe';
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
    PlotComponent,
    ViewComponent,
    RecordsComponent,
    DemoPageComponent,
    SelectDataFormComponent,
    ChartSelector,
    IsArrayPipe,
    AnameComponent,
    SampleFormComponent,
    nvD3,
    PropertyTypeConvertPipe],
  imports: [
    BrowserModule,
    FormsModule,  
    HttpModule,
    MaterialModule.forRoot(),
     ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent
        ,
        children: [
          {path: '', component: PlotComponent},
          { path: 'plot', component: PlotComponent },
          { path: 'view/:key', component: ViewComponent },
          { path: 'records/:hash', component: RecordsComponent },
          { path: 'demo', component: DemoPageComponent }
        ]
      }
    ]),
   
    MaterialModule.forRoot()
  ],
  exports: [
    RouterModule
  ],
  providers: [ApiService]
  //,
    //bootstrap: [HomeComponent]
})
export class MainAppModule { }