import { 
  Component,
  OnInit,
  animate,
  AnimationTransitionEvent,
  state,
  style,
  trigger,
  transition
 } from '@angular/core';
import { Router }            from '@angular/router';
import { FirebaseListObservable } from 'angularfire2';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-firebase',
  templateUrl: './firebase.component.html',
  styleUrls: ['./firebase.component.css'],
  providers: [FirebaseService],
  animations: [
		trigger('enterAnimation', [
			state('in', style({ transform: 'scale(1,1)' })),
			transition('void => *', [
				style({ transform: 'scale(0,0)' }),
				animate(300)
			])
		]),
	]
})

export class FirebaseComponent implements OnInit {
	items: FirebaseListObservable<any> = this.firebaseService.items;
	
  constructor(private router: Router,
  	private firebaseService: FirebaseService) {}

  gotoDetail(key: string): void {
    let link = ['/view', key];
    this.router.navigate(link);
  }

  gotoGraph(key: string): void {
    this.router.ngOnDestroy();
    //window.location.href=key;
    window.open(key);

  }

  // save(user, chartName, chartType, chartDataValues, api, graphURL) {
  // 	this.firebaseService.save(user, chartName, chartType, chartDataValues, api, graphURL);
  // }

  deleteItem(key: string) {
  	this.firebaseService.deleteItem(key);
  }

	ngOnInit() {
		
	}

}
