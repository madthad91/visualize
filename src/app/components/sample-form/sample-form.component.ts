import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sample-form',
  templateUrl: './sample-form.component.html',
  styleUrls: ['./sample-form.component.css']
})
export class SampleFormComponent implements OnInit {
  hai:string = "you"

  constructor() { }

  ngOnInit() {
  }

}
