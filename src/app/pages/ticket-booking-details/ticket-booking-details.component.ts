import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../shared/services/api.service";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-ticket-booking-details',
  templateUrl: './ticket-booking-details.component.html',
  styleUrls: ['./ticket-booking-details.component.scss']
})
export class TicketBookingDetailsComponent {
  invoiceData: any ;
  downloadInvoiceUrl: string = '';
  constructor(private route: ActivatedRoute,
              private router: Router,
              private apiService: ApiService,
              public htmlSanitizer: DomSanitizer
              ) {
    //get state from router
    const state = this.router.getCurrentNavigation()?.extras.state;
    this.invoiceData = state;
    if(this.invoiceData?.eventId && this.invoiceData?.orderNumber){
      this.downloadInvoiceUrl=`https://api.ticketsplug.com/api/v1/ticket/download?eventId=${this.invoiceData.eventId}&orderNumber=${this.invoiceData.orderNumber}`
    }
    console.log('state', state);
  }
}
