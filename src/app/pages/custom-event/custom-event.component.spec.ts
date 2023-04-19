import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomEventComponent } from './custom-event.component';

describe('CustomEventComponent', () => {
  let component: CustomEventComponent;
  let fixture: ComponentFixture<CustomEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomEventComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
