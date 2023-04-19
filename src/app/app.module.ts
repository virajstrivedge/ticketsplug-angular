import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HeaderComponent} from './shared/components/header/header.component';
import {FooterComponent} from './shared/components/footer/footer.component';
import {HomeComponent} from './pages/home/home.component';
import {EventDetailsComponent} from './pages/event-details/event-details.component';
import {InvoiceDetailsComponent} from './pages/invoice-details/invoice-details.component';
import {HttpClientModule} from "@angular/common/http";
import {SelectTicketModalComponent} from './shared/components/select-ticket-modal/select-ticket-modal.component';
import {ReactiveFormsModule} from "@angular/forms";
import {NgxStripeModule} from "ngx-stripe";
import { LeavePaymentModalComponent } from './shared/components/leave-payment-modal/leave-payment-modal.component';
import { TicketBookingDetailsComponent } from './pages/ticket-booking-details/ticket-booking-details.component';
import { CustomEventComponent } from './pages/custom-event/custom-event.component';
import { BrowseEventComponent } from './pages/browse-event/browse-event.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    EventDetailsComponent,
    InvoiceDetailsComponent,
    SelectTicketModalComponent,
    LeavePaymentModalComponent,
    TicketBookingDetailsComponent,
    CustomEventComponent,
    BrowseEventComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxStripeModule.forRoot('pk_live_fLA9xt0XKhjnqIYyAZQA39aP007m4vWHM7'),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
