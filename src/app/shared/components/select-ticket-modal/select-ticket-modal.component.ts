import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {EventDetails, EventTicketsList, EventTicketsListCart} from "../../models/event";

@Component({
  selector: 'app-select-ticket-modal',
  templateUrl: './select-ticket-modal.component.html',
  styleUrls: ['./select-ticket-modal.component.scss']
})
export class SelectTicketModalComponent implements OnInit{
  @Input() eventDetails:EventDetails = {} as EventDetails;
  eventTicketList: EventTicketsListCart[] = [];
  isProceed:boolean = false;
  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit(): void {
    console.log(this.eventDetails)
    this.eventTicketList = this.eventDetails?.eventTicketsList.map(ticket => {
      return {
        ...ticket,
        addedQuantity: 0
      }
    });
  }


}
