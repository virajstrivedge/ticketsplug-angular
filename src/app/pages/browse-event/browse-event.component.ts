import {Component, OnInit} from '@angular/core';
import {NgbNavChangeEvent} from "@ng-bootstrap/ng-bootstrap";
import {ApiService} from "../../shared/services/api.service";
import {BrowseEvent} from "../../shared/models/browseEvent";
import {HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-browse-event',
  templateUrl: './browse-event.component.html',
  styleUrls: ['./browse-event.component.scss']
})
export class BrowseEventComponent implements OnInit {
  active = 1;
  allEvents:BrowseEvent[] = [];


  constructor(private apiService: ApiService,private router: Router) {

  }

  ngOnInit(): void {
    this.getEvents('upcoming');
  }

  onNavChange($event: NgbNavChangeEvent<any>) {
    //get current active tab
    console.log($event.nextId);
    if ($event.nextId == 1) {
      this.getEvents('upcoming');
    }
    if ($event.nextId == 2) {
      this.getEvents('past');
    }
  }

  getEvents(type:string) {
    let params = new HttpParams();
    // params = params.append('page', '1');
    // params = params.append('size', '10');
    params = params.append('eventHistory',type );

    this.apiService.getEventList(params).subscribe((res) => {
      this.allEvents = res.data.list.filter(x=>!x.eventCancelled);
      console.log(this.allEvents);
    },error => {
      console.log(error);
      this.allEvents = [];
    })
  }

  addSubdomain(eventId:string){
    if(environment.production){
      console.log('production');
      return `https://${eventId}.www.ticketsplug.com/`;
    }else {
      console.log('development');
      return `http://${eventId}.localhost:4200/`;
    }
  }


}
