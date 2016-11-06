import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';

import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
  providers: [FirebaseService]
})
export class ViewComponent implements OnInit {
	info: {};
  key: string;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private firebaseService: FirebaseService) { }

  ngOnInit() {
  	this.route.params.forEach((params: Params) => {
    let key = params['key'];
    this.key = key;
    this.firebaseService.getInfo(key);
  });
  }

	goBack(): void {
	  this.location.back();
	}

}
