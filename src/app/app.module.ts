import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AnameComponent } from './components/aname/aname.component';
import { SampleFormComponent } from './components/sample-form/sample-form.component';
import { MaterialModule} from '@angular/material';
import { PropertyTypeConvertPipe } from './pipes/property-type-convert.pipe';
import { HomeComponent } from './components/home/home.component';
import { ViewComponent } from './components/view/view.component';
import { PlotComponent } from './components/plot/plot.component';
import { SelectDataFormComponent } from './components/select-data-form/select-data-form.component';

@NgModule({
  declarations: [
    AppComponent,
    AnameComponent,
    SampleFormComponent,
    PropertyTypeConvertPipe,
    HomeComponent,
    ViewComponent,
    PlotComponent,
    SelectDataFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'plot', component: PlotComponent },
      { path: 'view', component: ViewComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
