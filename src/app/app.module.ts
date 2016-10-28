import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AnameComponent } from './components/aname/aname.component';
import { SampleFormComponent } from './components/sample-form/sample-form.component';
import { MaterialModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    AnameComponent,
    SampleFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
