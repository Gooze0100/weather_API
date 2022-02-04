import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AvailableLocationsService } from 'src/app/services/available-locations.service';

@Component({
  selector: 'app-location-results',
  templateUrl: './location-results.component.html',
  styleUrls: ['./location-results.component.scss'],
})
export class LocationResultsComponent implements OnInit, OnDestroy {
  private dataSubscription: Subscription;
  public allData: any;
  // public allDataCopy = [
  //   {
  //     id: 100456172,
  //     name: 'Riga',
  //     country: 'Latvia',
  //     timezone: 'Europe/Riga',
  //     adminArea: 'Riga',
  //     lon: 24.100000381,
  //     lat: 56.950000763,
  //   },
  //   {
  //     id: 106122288,
  //     name: 'Rigaud',
  //     country: 'Canada',
  //     timezone: 'America/Montreal',
  //     adminArea: 'Quebec',
  //     lon: -74.302383423,
  //     lat: 45.479270935,
  //   },
  //   {
  //     id: 102983572,
  //     name: 'Rigarda',
  //     country: 'France',
  //     timezone: 'Europe/Paris',
  //     adminArea: 'Languedoc-Roussillon Region',
  //     lon: 2.533333302,
  //     lat: 42.633335114,
  //   },
  //   {
  //     id: 102983571,
  //     name: 'Rigaud',
  //     country: 'France',
  //     timezone: 'Europe/Paris',
  //     adminArea: "Provence-Alpes-Côte d'Azur Region",
  //     lon: 6.983333111,
  //     lat: 44,
  //   },
  //   {
  //     id: 106293973,
  //     name: 'Rigacher',
  //     country: 'Switzerland',
  //     timezone: 'Europe/Zurich',
  //     adminArea: 'Canton of Zurich',
  //     lon: 8.681479454,
  //     lat: 47.438392639,
  //   },
  // ];

  constructor(
    // private route: ActivatedRoute,
    private availableLocationsService: AvailableLocationsService
  ) {}

  ngOnInit(): void {
    this.dataSubscription = this.availableLocationsService.data.subscribe(
      (data) => {
        console.log(data);
        this.allData = data;
      }
    );
  }
  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }
}
