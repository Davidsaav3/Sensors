import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicesMapComponent } from './devices-map.component';

describe('DevicesMapComponent', () => {
  let component: DevicesMapComponent;
  let fixture: ComponentFixture<DevicesMapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DevicesMapComponent]
    });
    fixture = TestBed.createComponent(DevicesMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
