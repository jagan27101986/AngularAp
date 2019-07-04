import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CallListComponent } from './call-list/call-list.component';
import { DetailCallListComponent } from './detail-call-list/detail-call-list.component';


const routes: Routes = [
    {path: "", component: CallListComponent}, /** CALL LIST **/
    {path:"detailList/:id", component:DetailCallListComponent}, /** DETAILS OF CUSTOMERS **/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
