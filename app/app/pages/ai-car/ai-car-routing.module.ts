import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AiCarPage } from './ai-car.page';

const routes: Routes = [
  {
    path: '',
    component: AiCarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AiCarPageRoutingModule {}
