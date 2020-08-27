import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CircuitDetailsPageRoutingModule } from './circuit-details-routing.module';

import { CircuitDetailsPage } from './circuit-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CircuitDetailsPageRoutingModule
  ],
  declarations: [CircuitDetailsPage]
})
export class CircuitDetailsPageModule {}
