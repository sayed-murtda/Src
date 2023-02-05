import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddCarPageRoutingModule } from './add-car-routing.module';

import { AddCarPage } from './add-car.page';
import { ComponentsModule } from 'src/app/Component/Components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddCarPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [AddCarPage]
})
export class AddCarPageModule {}
