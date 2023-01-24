import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowroomsPageRoutingModule } from './showrooms-routing.module';

import { ShowroomsPage } from './showrooms.page';
import { ComponentsModule } from 'src/app/Component/Components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowroomsPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ShowroomsPage]
})
export class ShowroomsPageModule {}
