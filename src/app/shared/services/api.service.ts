import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {EventResponse} from "../models/event";
import {QuotationResponse} from "../models/quotationResponse";
import {BrowseEventResponse} from "../models/browseEvent";
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
  getQuotation(data:any):Observable<QuotationResponse>{
    return this._http.post<QuotationResponse>(`https://api.ticketsplug.com/api/v1/events/booking/quatation`,data)
  }
  releaseQuotation(data:any):Observable<any>{
    return this._http.post<any>(`https://api.ticketsplug.com/api/v1/events/tickets/release`,data)
  }
  payment(data:any):Observable<any>{
    let headers :any= {}
    headers['Accept-Language'] = 'en'
    headers['Device-Id'] = ''
    headers['Device-Type'] = 'web'
    headers['Device-Name'] = ''
    headers['app-version'] = '1.0'
    if(localStorage.getItem('accessToken')){
      headers['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`
    }
    return this._http.post<any>(`https://api.ticketsplug.com/api/v1/events/booking/payment`,data,{headers})
  }
  contactUs(data:any):Observable<any>{
    return this._http.post<any>(`https://api.ticketsplug.com/api/v1/contactus/create`,data)
  }
  getEventList(params:HttpParams):Observable<BrowseEventResponse>{
    return this._http.get<BrowseEventResponse>(`https://api.ticketsplug.com/api/v1/events/browse`,{params})
  }
}
