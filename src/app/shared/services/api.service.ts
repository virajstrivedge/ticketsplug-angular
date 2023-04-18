import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {EventResponse} from "../models/event";
import {QuotationResponse} from "../models/quotationResponse";
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
    return this._http.post<any>(`https://api.ticketsplug.com/api/v1/events/booking/payment`,data,{
      headers:{
        'Authorization':`Bearer ${localStorage.getItem('accessToken')??''}`,
        'Accept-Language': 'en',
        'Device-Id':'',
        'Device-Type':'web',
        'Device-Name':'',
        'app-version':'1.0',
      }
    })
  }
}
