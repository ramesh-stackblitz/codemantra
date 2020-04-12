import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewlistComponent } from './viewlist/viewlist.component';


const routes: Routes = [
  {
    path: '',
    component: ViewlistComponent
  },
  {
    path: 'app-viewlist',
    component: ViewlistComponent

  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
