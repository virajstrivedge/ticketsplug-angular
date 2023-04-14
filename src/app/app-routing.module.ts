import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {EventDetailsComponent} from "./pages/event-details/event-details.component";

const routes: Routes = [
  {
    path: '',
    component:EventDetailsComponent
  },
  {
    path:'event-details/:id',
    component:EventDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
