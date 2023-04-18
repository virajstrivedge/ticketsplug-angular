import { Component } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-leave-payment-modal',
  templateUrl: './leave-payment-modal.component.html',
  styleUrls: ['./leave-payment-modal.component.scss']
})
export class LeavePaymentModalComponent {
  constructor(public activeModal: NgbActiveModal) {
  }

}
