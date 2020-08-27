import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CircuitDetailsPage } from './circuit-details.page';

const routes: Routes = [
  {
    path: '',
    component: CircuitDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CircuitDetailsPageRoutingModule {}
