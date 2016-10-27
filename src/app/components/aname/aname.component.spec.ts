/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AnameComponent } from './aname.component';

describe('AnameComponent', () => {
  let component: AnameComponent;
  let fixture: ComponentFixture<AnameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
