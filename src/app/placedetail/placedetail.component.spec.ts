import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacedetailComponent } from './placedetail.component';

describe('PlacedetailComponent', () => {
  let component: PlacedetailComponent;
  let fixture: ComponentFixture<PlacedetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlacedetailComponent]
    });
    fixture = TestBed.createComponent(PlacedetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
