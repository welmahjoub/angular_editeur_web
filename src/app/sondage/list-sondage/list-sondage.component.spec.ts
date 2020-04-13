import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSondageComponent } from './list-sondage.component';

describe('ListSondageComponent', () => {
  let component: ListSondageComponent;
  let fixture: ComponentFixture<ListSondageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSondageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSondageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
