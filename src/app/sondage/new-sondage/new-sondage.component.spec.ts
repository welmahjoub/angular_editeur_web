import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSondageComponent } from './new-sondage.component';

describe('NewSondageComponent', () => {
  let component: NewSondageComponent;
  let fixture: ComponentFixture<NewSondageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSondageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSondageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
