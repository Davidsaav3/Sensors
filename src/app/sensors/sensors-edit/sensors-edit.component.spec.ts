import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorsEditComponent } from './sensors-edit.component';

describe('SensorsEditComponent', () => {
  let component: SensorsEditComponent;
  let fixture: ComponentFixture<SensorsEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SensorsEditComponent]
    });
    fixture = TestBed.createComponent(SensorsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
