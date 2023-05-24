import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicesSensorsListComponent } from './devices-sensors-list.component';

describe('DevicesSensorsListComponent', () => {
  let component: DevicesSensorsListComponent;
  let fixture: ComponentFixture<DevicesSensorsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DevicesSensorsListComponent]
    });
    fixture = TestBed.createComponent(DevicesSensorsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
