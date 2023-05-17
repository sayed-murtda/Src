import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowroomProfilePageRoutingModule } from './showroom-profile-routing.module';

import { ShowroomProfilePage } from './showroom-profile.page';
import { ComponentsModule } from 'src/app/Component/Components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowroomProfilePageRoutingModule,
    ComponentsModule
  ],
  declarations: [ShowroomProfilePage]
})
export class ShowroomProfilePageModule {}
