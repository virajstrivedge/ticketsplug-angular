import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../shared/services/api.service";
import Swal from "sweetalert2";
import {Router} from "@angular/router";


@Component({
  selector: 'app-custom-event',
  templateUrl: './custom-event.component.html',
  styleUrls: ['./custom-event.component.scss']
})
export class CustomEventComponent {
  isFormSubmitted = false;
  contactForm:FormGroup;
  categories = [
    {id: '', name: 'Select Category'},
    {id: 'I wanted to create an event', name: 'I wanted to create an event'},
    {id: 'I am attending an event', name: 'I am attending an event'},
  ];
  queries = [
    {id: 'Login and Registration', name: 'Login and Registration',category:'I wanted to create an event'},
    {id: 'Account Information and Settings', name: 'Account Information and Settings',category:'I wanted to create an event'},
    {id: 'Tickets and Inventory', name: 'Tickets and Inventory',category:'I wanted to create an event'},
    {id: 'Reports and Analysis', name: 'Reports and Analysis',category:'I wanted to create an event'},
    {id: 'Tickets and receipts', name: 'Tickets and receipts',category:'I am attending an event'},
    {id: 'Buying tickets', name: 'Buying tickets',category:'I am attending an event'},
    {id: 'Acount and Profile', name: 'Acount and Profile',category:'I am attending an event'},
    {id: 'Orders', name: 'Orders',category:'I am attending an event'},

  ];
  queryList = [
    {id: '', name: 'Select Query'},
  ];
  constructor(private fb: FormBuilder,
              private apiService:ApiService,
              private router:Router
              ) {
    this.contactForm = this.fb.group({
      name: ['',Validators.required],
      mobile: ['',[Validators.required,Validators.pattern('^[0-9]*$'),Validators.minLength(10),Validators.maxLength(10)]],
      email: ['',[Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      category: ['',Validators.required],
      query: ['',Validators.required],
      comment: ['',Validators.required]
    });


  }


  getQueries($event: Event) {
    const category = this.contactForm.get('category')?.value;
    let filteredList = this.queries.filter((query) => query.category === category);
    this.queryList= [{id: '', name: 'Select Query'},...filteredList];
  }
  submitForm() {
    this.isFormSubmitted = true;
    if (this.contactForm.invalid) {
      return;
    }
    this.apiService.contactUs(this.contactForm.value).subscribe((res:any) => {
      Swal.fire({
        title: 'Success!',
        text: 'Your message has been sent successfully',
        icon: 'success',
      }).then(() => {
        this.router.navigate(['/home']);
      });
    },error => {
      console.log(error);
    });
  }
}
