import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AnameComponent } from './components/aname/aname.component';
import { SampleFormComponent } from './components/sample-form/sample-form.component';
import { MaterialModule} from '@angular/material';
import { PropertyTypeConvertPipe } from './pipes/property-type-convert.pipe';
import { HomeComponent } from './components/home/home.component';
import { ViewComponent } from './components/view/view.component';
import { PlotComponent } from './components/plot/plot.component';
import { SelectDataFormComponent } from './components/select-data-form/select-data-form.component';
import { DemoPageComponent } from './components/demo-page/demo-page.component';
import { ChartSelector } from './components/demo-page/chart-selector'
import { nvD3} from 'ng2-nvd3';

import { ApiService } from './services/api.service';
import { IsArrayPipe } from './pipes/is-array.pipe';
import { FirebaseComponent } from './components/firebase/firebase.component';
import { 
  AngularFireModule, 
  AuthMethods, 
  AuthProviders 
} from "angularfire2";
//import { SelectDataFormUrlentryComponent } from './components/select-data-form-urlentry/select-data-form-urlentry.component';

const firebaseConfig = {
  apiKey: "AIzaSyCdlyXLG8B75rDYQf-N_CtM_cBR8cLHqAQ",
  authDomain: "teamsomethingcool-54869.firebaseapp.com",
  databaseURL: "https://teamsomethingcool-54869.firebaseio.com",
  storageBucket: "teamsomethingcool-54869.appspot.com",
  messagingSenderId: "553854869745"
};

@NgModule({
  declarations: [
    AppComponent,
    AnameComponent,
    SampleFormComponent,
    PropertyTypeConvertPipe,
    HomeComponent,
    ViewComponent,
    PlotComponent,
    SelectDataFormComponent,
    DemoPageComponent,
    ChartSelector,
    nvD3,
    IsArrayPipe,
    FirebaseComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig,{
      provider: AuthProviders.Anonymous, //AuthProviders.Google,
      method: AuthMethods.Anonymous //AuthMethods.Popup
    }),
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'plot', component: PlotComponent },
      { path: 'view', component: ViewComponent },
      { path: 'demo', component: DemoPageComponent}
    ]),
    ReactiveFormsModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
