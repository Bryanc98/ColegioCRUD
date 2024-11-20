import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCalificacionComponent } from './add-calificacion.component';

describe('AddCalificacionComponent', () => {
  let component: AddCalificacionComponent;
  let fixture: ComponentFixture<AddCalificacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCalificacionComponent]
    });
    fixture = TestBed.createComponent(AddCalificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
