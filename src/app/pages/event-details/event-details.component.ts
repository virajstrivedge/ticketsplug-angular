import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ApiService} from "../../shared/services/api.service";
import {HttpParams} from "@angular/common/http";
import {EventDetails, EventResponse} from "../../shared/models/event";
import {SelectTicketModalComponent} from "../../shared/components/select-ticket-modal/select-ticket-modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {
  eventName: string = '';
  eventDetails: EventDetails= {} as EventDetails;

  constructor(private route: ActivatedRoute, private apiService: ApiService,private modalService: NgbModal) {
    const {hostname} = window.location
    const [subdomain] = hostname.split('.')
    this.eventName = subdomain;

  }

  ngOnInit(): void {
    this.getEventDetails();

  }

  getEventDetails() {
    let params = new HttpParams();
    params = params.append('eventName', this.eventName);
    this.apiService.getEventDetails(params).subscribe((res: EventResponse) => {
      this.eventDetails = res.data;
      console.log(this.eventDetails)
    }, error => {
      console.log(error)
    })
  }

  //get remaining tickets
  getAvailableTickets():number {
    return this.eventDetails?.eventTicketsList?.reduce((acc, ticket) => acc + ticket.availableSeats, 0) ?? 0;
  }
  openTicketModal() {
    const modalRef = this.modalService.open(SelectTicketModalComponent);
    modalRef.componentInstance.eventDetails = this.eventDetails;
  }

}
