import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorsNewComponent } from './sensors-new.component';

describe('SensorsNewComponent', () => {
  let component: SensorsNewComponent;
  let fixture: ComponentFixture<SensorsNewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SensorsNewComponent]
    });
    fixture = TestBed.createComponent(SensorsNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
