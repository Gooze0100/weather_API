import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponentComponent } from './default/default.component';
import { LocationResultsComponent } from './main/location-results/location-results.component';
import { SearchedLocationsComponent } from './main/searched-locations/searched-locations.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultComponentComponent,
    children: [
      {
        path: 'location',
        // path: 'location/:id',
        // nurodyti is input component per couter parametra
        component: LocationResultsComponent,
      },
      {
        path: 'location/:id',
        component: SearchedLocationsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
