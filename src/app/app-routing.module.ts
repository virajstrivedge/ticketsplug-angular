import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {EventDetailsComponent} from "./pages/event-details/event-details.component";
import {InvoiceDetailsComponent} from "./pages/invoice-details/invoice-details.component";
import {TicketBookingDetailsComponent} from "./pages/ticket-booking-details/ticket-booking-details.component";

const routes: Routes = [
  {
    path: '',
    component:EventDetailsComponent
  },
  {
    path:'event-details/:id',
    component:EventDetailsComponent
  },
  {
    path:'invoice-details',
    component:InvoiceDetailsComponent
  },
  {
    path:'booking-ticket-details',
    component:TicketBookingDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
