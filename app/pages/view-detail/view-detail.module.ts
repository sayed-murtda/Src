import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewDetailPageRoutingModule } from './view-detail-routing.module';

import { ViewDetailPage } from './view-detail.page';
import { ComponentsModule } from 'src/app/Component/Components.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewDetailPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ViewDetailPage]
})
export class ViewDetailPageModule {}
