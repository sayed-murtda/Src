import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowroomProfilePage } from './showroom-profile.page';

const routes: Routes = [
  {
    path: '',
    component: ShowroomProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowroomProfilePageRoutingModule {}
