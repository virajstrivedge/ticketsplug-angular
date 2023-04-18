import {Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Quotation} from "../../shared/models/quotationResponse";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../shared/services/api.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../auth/services/authentication.service";
import {User} from "../../auth/models/user";
import {StripeCardComponent, StripeService} from "ngx-stripe";
import {StripeCardElementOptions, StripeElementsOptions} from "@stripe/stripe-js";

@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InvoiceDetailsComponent implements OnInit, OnDestroy {
  @ViewChild(StripeCardComponent) card: StripeCardComponent | undefined;
  quotationData: Quotation = {} as Quotation;
  isGuestShow: boolean = false;
  loginForm: FormGroup;
  loginSubmitted: boolean = false;
  currentUser: User = {} as User;
  private timerId!: number;
  private remainingTime: number = 900;
  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#878787',
        color: '#878787',
        fontWeight: '500',
        fontFamily: 'josefinsans-regular',
        fontSize: '18px',
        '::placeholder': {
          color: '#878787',
          fontFamily: 'josefinsans-regular',
          fontWeight: '500',
          fontSize: '18px',
        }
      }
    }
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'en'
  };
  stripeTokenForm: FormGroup;
  stripeCardValid: boolean = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder,
              private authService: AuthenticationService,
              private apiService: ApiService,
              private stripeService: StripeService,
  ) {
    this.quotationData = this.router.getCurrentNavigation()?.extras.state as Quotation;
    this.authService.currentUser.subscribe(x => {
      this.currentUser = x as User;
      console.log('currentUser', this.currentUser)
    });
    console.log('aa', this.quotationData)
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', Validators.required]
    });
    this.stripeTokenForm = this.fb.group({
      name: ['', [Validators.required]],
      email: [this.currentUser?.email??'', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
    });
  }

  ngOnInit(): void {
    this.startTimer();

  }

  signIn() {
    this.loginSubmitted = true;
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe((res) => {
        console.log(res);
        this.stripeTokenForm.patchValue({
          email: this.currentUser?.email
        });
      }, (error) => {
        console.log(error);
      });
    } else {
      return;
    }
  }

  startTimer() {
    this.timerId = setInterval(() => {
      this.remainingTime--;
      if (this.remainingTime <= 0) {
        clearInterval(this.timerId);
        console.log('finished');
      }
    }, 1000);
  }

  get minutes(): number {
    return Math.floor(this.remainingTime / 60);
  }

  get seconds(): number {
    return this.remainingTime % 60;
  }

  get validCardForm() {
    return this.stripeTokenForm.valid && this.stripeCardValid;
  }

  onCardChange(event: any) {
    this.stripeCardValid = event.complete
  }

  createToken() {
    console.log(this.stripeTokenForm.value)
    if(this.stripeTokenForm.valid){
      const name = this.stripeTokenForm.get('name')?.value;
      const email = this.stripeTokenForm.get('email')?.value;
      this.stripeService
        .createToken(this.card!.element, this.stripeTokenForm.value)
        .subscribe((result) => {
          if (result.token) {
            console.log(result.token.id);
            let data:any = {}
            data.bookingAmount = this.quotationData.ticketPrice;
            data.bookingCode = this.quotationData.bookingCode;
            data.bookingDate = this.quotationData.eventDate;
            data.discountAmount = 0;
            data.eventId = this.quotationData.eventId;
            data.handlingFees = this.quotationData.handlingFees;
            data.stripeCharges = this.quotationData.stripeCharges;
            data.stripeToken = result.token.id;
            data.tickets = this.quotationData.selectedTickets.map((ticket) => {
              return{
                tickets: ticket.bookedSeats,
                ticketsCategoryId: ticket.ticketCategoryId
              }
            });
            data.promoterCode = "";
            data.totalAmount = this.quotationData.totalAmount;
            data.guestUserRequest = {
              email: email,
              firstName: this.currentUser.firstName,
              lastName: this.currentUser.lastName,
            }
            data.organizingFees = this.quotationData.organizingFees;
            this.apiService.payment(data).subscribe((res) => {
              console.log(res);

            },error => {
              console.log(error);
              this.cancel();
            });

          } else if (result.error) {
            console.log(result.error.message);
          }
        });
    }
  }

  cancel() {
    let data:any = {}
    data.bookingCode = this.quotationData.bookingCode;
    data.eventId = this.quotationData.eventId;
    data.tickets = this.quotationData.selectedTickets.map((ticket) => {
      return{
        tickets: ticket.bookedSeats,
        ticketsCategoryId: ticket.ticketCategoryId
      }
    });

    this.apiService.releaseQuotation(data).subscribe((res) => {
      this.router.navigate(['/']);
    },error => {
      this.router.navigate(['/']);
    });

  }

  ngOnDestroy(): void {
    clearInterval(this.timerId);
  }
}
