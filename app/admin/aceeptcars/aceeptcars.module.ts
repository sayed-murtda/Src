import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AceeptcarsPageRoutingModule } from './aceeptcars-routing.module';

import { AceeptcarsPage } from './aceeptcars.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AceeptcarsPageRoutingModule
  ],
  declarations: [AceeptcarsPage]
})
export class AceeptcarsPageModule {}
