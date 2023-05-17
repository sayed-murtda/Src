import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowroomProfilePageRoutingModule } from './showroom-profile-routing.module';

import { ShowroomProfilePage } from './showroom-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowroomProfilePageRoutingModule
  ],
  declarations: [ShowroomProfilePage]
})
export class ShowroomProfilePageModule {}
