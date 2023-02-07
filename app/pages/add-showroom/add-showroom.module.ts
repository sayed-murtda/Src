import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddShowroomPageRoutingModule } from './add-showroom-routing.module';

import { AddShowroomPage } from './add-showroom.page';
import { ComponentsModule } from 'src/app/Component/Components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddShowroomPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [AddShowroomPage]
})
export class AddShowroomPageModule {}
