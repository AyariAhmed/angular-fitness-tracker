import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TrainingComponent} from './training.component';


const routes : Routes = [
  {path : '', component : TrainingComponent},
]

@NgModule({
  imports : [RouterModule.forChild(routes)],
  exports : [RouterModule]
})
export class TrainingRoutingModule {

}
