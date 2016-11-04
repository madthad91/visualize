import { AngularFire, AuthProviders, AuthMethods, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { Injectable }    from '@angular/core';


@Injectable()
export class FirebaseService {
	user = {};
	info = [];
	items: FirebaseListObservable<any>;
	itemKey: FirebaseListObservable<any>;
  
  constructor(public af: AngularFire) {
  	this.items = af.database.list('/data');
  }

  save(user, chartType, chartDataValues, api, graphURL) {
	    this.items.push({
	    	user: user, 
	    	// chartName: chartName, // Still needs to be added
	    	chartType: chartType, 
	    	chartDataValues: chartDataValues, 
	    	api: api,
	    	graphURL: graphURL
	    });
	}

	//deletes an item
	deleteItem(key: string) {    
		this.items.remove(key); 
	}

	getInfo(key: string){
		this.itemKey = this.af.database.list('/data/'+key);
	}

  /*login() {
	  this.af.auth.login({
	    provider: AuthProviders.Anonymous
	  });
	}*/
	 
	// logout() {
	//   this.af.auth.logout();
	// }

	//deletes everything
	/*deleteAll() {
		this.items.remove();
	}*/

	/*listAll() {
		this.items
		  .subscribe(snapshots => {
		    snapshots.forEach(snapshot => {
		      console.log(snapshot.key)
		      console.log(snapshot.val())
		    });
		  })
	}*/
}