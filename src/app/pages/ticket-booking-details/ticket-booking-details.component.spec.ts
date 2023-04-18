import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketBookingDetailsComponent } from './ticket-booking-details.component';

describe('TicketBookingDetailsComponent', () => {
  let component: TicketBookingDetailsComponent;
  let fixture: ComponentFixture<TicketBookingDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketBookingDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketBookingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
