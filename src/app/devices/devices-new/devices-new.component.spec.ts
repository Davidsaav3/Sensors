import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicesNewComponent } from './devices-new.component';

describe('DevicesNewComponent', () => {
  let component: DevicesNewComponent;
  let fixture: ComponentFixture<DevicesNewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DevicesNewComponent]
    });
    fixture = TestBed.createComponent(DevicesNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
