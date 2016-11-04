import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-firebase',
  templateUrl: './firebase.component.html',
  styleUrls: ['./firebase.component.css']
})
export class FirebaseComponent implements OnInit {
	user = {};
	list = {};
	username: string;
	items: FirebaseListObservable<any>;

  constructor(public af: AngularFire) {
  	this.items = af.database.list('/data');

  	this.items.subscribe(snapshot => {
	  console.log(snapshot.key)
	  console.log(snapshot.val())
	});

	this.list = af.database.list('/data', {
      query: {
        orderByChild: 'user'
      }
    });
  }

	login() {
	  this.af.auth.login({
	    provider: AuthProviders.Anonymous
	  });
	}
	 
	logout() {
	  this.af.auth.logout();
	}

	save(user, chartType, chartDataValues, api, graphURL) {
	    this.items.push({
	    	user: user, 
	    	chartType: chartType, 
	    	chartDataValues: chartDataValues, 
	    	api: api,
	    	graphURL: graphURL
	    });
	}

	//deletes everything
	deleteAll() {
		this.items.remove();
	}

	//deletes an item
	deleteItem(key: string) {    
		this.items.remove(key); 
	}

	listAll() {
		this.items
		  .subscribe(snapshots => {
		    snapshots.forEach(snapshot => {
		      console.log(snapshot.key)
		      console.log(snapshot.val())
		    });
		  })
	}

	ngOnInit() {
		
	}

}
