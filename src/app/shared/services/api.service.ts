import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {EventResponse} from "../models/event";
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl=environment.apiUrl
  constructor(private _http: HttpClient) {

  }

  getEventDetails(params:any):Observable<EventResponse>{
    return this._http.get<EventResponse>(`https://api.ticketsplug.com/api/v1/events/detailsbyname`,{params})
  }
}
