import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { FirebaseListObservable } from 'angularfire2';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-firebase',
  templateUrl: './firebase.component.html',
  styleUrls: ['./firebase.component.css'],
  providers: [FirebaseService]
})
export class FirebaseComponent implements OnInit {
	items: FirebaseListObservable<any> = this.firebaseService.items;
	
  constructor(private router: Router,
  	private firebaseService: FirebaseService) {}

  gotoDetail(key: string): void {
    let link = ['/view', key];
    this.router.navigate(link);
  }

  save(user, chartType, chartDataValues, api, graphURL) {
  	this.firebaseService.save(user, chartType, chartDataValues, api, graphURL);
  }

  deleteItem(key: string) {
  	this.firebaseService.deleteItem(key);
  }

	ngOnInit() {
		
	}

}
