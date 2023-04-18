import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../auth/services/authentication.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isLoggedIn = false;
  constructor(private authService: AuthenticationService, private router: Router) {
    this.authService.currentUser.subscribe(x => {
      this.isLoggedIn=this.authService.isLoggedIn;

    });
  }

  logOut() {
    this.authService.logout();
this.router.navigate(['/']);
  }
}
