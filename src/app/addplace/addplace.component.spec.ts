import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddplaceComponent } from './addplace.component';

describe('AddplaceComponent', () => {
  let component: AddplaceComponent;
  let fixture: ComponentFixture<AddplaceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddplaceComponent]
    });
    fixture = TestBed.createComponent(AddplaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
