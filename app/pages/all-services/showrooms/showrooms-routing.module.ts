import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowroomsPage } from './showrooms.page';

const routes: Routes = [
  {
    path: '',
    component: ShowroomsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowroomsPageRoutingModule {}
