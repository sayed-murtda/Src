import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AHomePageRoutingModule } from './a-home-routing.module';

import { AHomePage } from './a-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AHomePageRoutingModule
  ],
  declarations: [AHomePage]
})
export class AHomePageModule {}
