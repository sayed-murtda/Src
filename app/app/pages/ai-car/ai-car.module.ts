import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AiCarPageRoutingModule } from './ai-car-routing.module';

import { AiCarPage } from './ai-car.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AiCarPageRoutingModule
  ],
  declarations: [AiCarPage]
})
export class AiCarPageModule {}
