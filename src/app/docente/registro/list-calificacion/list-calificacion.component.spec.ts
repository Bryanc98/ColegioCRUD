import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCalificacionComponent } from './list-calificacion.component';

describe('ListCalificacionComponent', () => {
  let component: ListCalificacionComponent;
  let fixture: ComponentFixture<ListCalificacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListCalificacionComponent]
    });
    fixture = TestBed.createComponent(ListCalificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
