import {Component, Output, EventEmitter} from '@angular/core';
import {ChartTypes} from './defs';

@Component({
  selector: 'chart-selector',
  template: `
  <button md-icon-button [md-menu-trigger-for]="menu">
   <md-icon>more_vert</md-icon>
</button>
<md-menu #menu="mdMenu">
    <button md-menu-item (click)="select.emit(type)" *ngFor="let type of cTypes">{{type}}</button>
</md-menu>
  `
})

export class ChartSelector {
  @Output() select = new EventEmitter();
  cTypes = ChartTypes;

  ngOnInit(){
    this.select.emit(this.cTypes[0]);
  }
}