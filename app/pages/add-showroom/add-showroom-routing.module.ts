import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddShowroomPage } from './add-showroom.page';

const routes: Routes = [
  {
    path: '',
    component: AddShowroomPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddShowroomPageRoutingModule {}
