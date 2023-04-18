import { Injectable } from '@angular/core';
import {BehaviorSubject, map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ResponseBody, User} from "../models/user";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public currentUser: Observable<User |null>;
  private currentUserSubject: BehaviorSubject<User |null>;
  constructor(private _http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User |null>(localStorage.getItem('userData')?JSON.parse(localStorage.getItem('userData')!):null);
    this.currentUser = this.currentUserSubject.asObservable();
  }
  public get currentUserValue(): User |null{
    return this.currentUserSubject.value;
  }

  get isLoggedIn(): boolean {
    return !!this.currentUserSubject.value?.userId && !! JSON.parse(localStorage.getItem('userData')!)?.['userId'];
  }

  login(data:any):Observable<User> {
    return this._http.post<ResponseBody>(`https://api.ticketsplug.com/api/v1/auth/login`, data,{
      headers: {
        'Accept-Language': 'en',
        'Device-Id':'',
        'Device-Type':'web',
        'Device-Name':'',
        'app-version':'1.0',
      }
    })
      .pipe(
        map((response:ResponseBody) => {
          // login successful if there's a jwt token in the response
          if (response.status!='success'){
            throw response.message;
          }
          if (response.status=='success'&& response.data?.userId) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('userData', JSON.stringify(response.data));
            localStorage.setItem('accessToken', response.token);

            // notify
            this.currentUserSubject.next(response.data);
          }

          return response.data;
        })
      );
  }

  logout() {
    localStorage.removeItem('userData');
    localStorage.removeItem('accessToken');
    this.currentUserSubject.next(null);
  }
}
