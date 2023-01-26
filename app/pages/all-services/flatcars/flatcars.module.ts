import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FlatcarsPageRoutingModule } from './flatcars-routing.module';

import { FlatcarsPage } from './flatcars.page';
import { ComponentsModule } from 'src/app/Component/Components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FlatcarsPageRoutingModule,
    ComponentsModule
  ],
  declarations: [FlatcarsPage]
})
export class FlatcarsPageModule {}
