import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FlatcarsPage } from './flatcars.page';

const routes: Routes = [
  {
    path: '',
    component: FlatcarsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FlatcarsPageRoutingModule {}
