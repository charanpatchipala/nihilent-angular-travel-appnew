import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditplaceComponent } from './editplace.component';

describe('EditplaceComponent', () => {
  let component: EditplaceComponent;
  let fixture: ComponentFixture<EditplaceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditplaceComponent]
    });
    fixture = TestBed.createComponent(EditplaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
