import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SigninupPageRoutingModule } from './signinup-routing.module';

import { SigninupPage } from './signinup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SigninupPageRoutingModule
  ],
  declarations: [SigninupPage]
})
export class SigninupPageModule {}
