import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute) {
    //get id params from url
    this.route.snapshot.paramMap.get('id');
    console.log(this.route.snapshot.paramMap.get('id'));

  }

  ngOnInit(): void {
  }


}
