import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EventDetailsComponent} from "./pages/event-details/event-details.component";
import {InvoiceDetailsComponent} from "./pages/invoice-details/invoice-details.component";
import {TicketBookingDetailsComponent} from "./pages/ticket-booking-details/ticket-booking-details.component";
import {HomeComponent} from "./pages/home/home.component";
import { CustomEventComponent } from './pages/custom-event/custom-event.component';
import {BrowseEventComponent} from "./pages/browse-event/browse-event.component";

const routes: Routes = [
  {
    path: '',
    component: EventDetailsComponent
  },
  {
    path: 'event-details/:id',
    component: EventDetailsComponent
  },
  {
    path: 'invoice-details',
    component: InvoiceDetailsComponent
  },
  {
    path: 'booking-ticket-details',
    component: TicketBookingDetailsComponent
  },
  {
    path: 'custom-event',
    component: CustomEventComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path:'browse-events',
    component:BrowseEventComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
