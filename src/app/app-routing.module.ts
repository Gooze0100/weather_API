import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponentComponent } from './default/default.component';
import { PageNotFoundComponent } from './default/page-not-found/page-not-found.component';
import { LocationResultsComponent } from './main/location-results/location-results.component';
import { SearchedLocationsComponent } from './main/searched-locations/searched-locations.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultComponentComponent,
    children: [
      {
        path: 'locations',
        component: LocationResultsComponent,
      },
      {
        path: 'location/:id',
        component: SearchedLocationsComponent,
      },
    ],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
