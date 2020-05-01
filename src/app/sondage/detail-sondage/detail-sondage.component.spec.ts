import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailSondageComponent } from './detail-sondage.component';

describe('DetailSondageComponent', () => {
  let component: DetailSondageComponent;
  let fixture: ComponentFixture<DetailSondageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailSondageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailSondageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
