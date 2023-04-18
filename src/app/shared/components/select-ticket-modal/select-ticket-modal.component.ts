import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {EventDetails, EventTicketsListCart} from "../../models/event";
import {ApiService} from "../../services/api.service";
import {Quotation} from "../../models/quotationResponse";
import {Router} from "@angular/router";

@Component({
  selector: 'app-select-ticket-modal',
  templateUrl: './select-ticket-modal.component.html',
  styleUrls: ['./select-ticket-modal.component.scss']
})
export class SelectTicketModalComponent implements OnInit{
  @Input() eventDetails:EventDetails = {} as EventDetails;
  eventTicketList: EventTicketsListCart[] = [];
  quotation:Quotation= {} as Quotation;
  isProceed:boolean = false;
  constructor(public activeModal: NgbActiveModal,
              private apiService:ApiService,
              private router:Router
              ) {
  }

  ngOnInit(): void {
    this.eventTicketList = this.eventDetails?.eventTicketsList.map(ticket => {
      return {
        ...ticket,
        addedQuantity: 0
      }
    });
  }

  get totalSelectedTicketsPrice():number {
    return this.eventTicketList.reduce((acc, ticket) => acc + ticket.addedQuantity * ticket.price, 0);
  }

  addQuantity(ticket: EventTicketsListCart) {
    if (ticket.addedQuantity < ticket.availableSeats) {
      ticket.addedQuantity++;
    }
  }
  removeQuantity(ticket: EventTicketsListCart) {
    if (ticket.addedQuantity > 0) {
      ticket.addedQuantity--;
    }
  }

  goToDetails() {
    let selectedTickets = this.eventTicketList.filter(ticket => ticket.addedQuantity > 0).map(ticket => {
      return {
        ticketsCategoryId: ticket.id,
        tickets: ticket.addedQuantity
      }
    });
    let data:any={}
    data.eventId = this.eventDetails.eventId;
    data.tickets = selectedTickets;

    this.apiService.getQuotation(data).subscribe(res=>{
      if (res.code === 200) {
        this.quotation = res.data;
        this.isProceed = true;
        console.log(res)

      }else{
        this.isProceed = false;
        console.log(res)
      }

    },error=>{
      this.isProceed = false;
      console.log(error)
    })

  }

  proceedToPay() {
    this.activeModal.close(this.quotation)
  }
}
