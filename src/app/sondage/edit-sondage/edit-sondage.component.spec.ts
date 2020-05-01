import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSondageComponent } from './edit-sondage.component';

describe('EditSondageComponent', () => {
  let component: EditSondageComponent;
  let fixture: ComponentFixture<EditSondageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSondageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSondageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
