import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AvailableLocationsService } from 'src/app/services/available-locations.service';
import { LogUserService } from 'src/app/services/log-user.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit, OnDestroy {
  @ViewChild('form') searchForm: NgForm;
  // padaryti kad issoktu laukelis su info
  public alert: boolean = false;
  public text: string = '';
  private availableLocationsSubscription: Subscription;
  private logKeywordsSubscription: Subscription;

  constructor(
    private availableLocationsService: AvailableLocationsService,
    private logUserDataService: LogUserService
  ) {}

  ngOnInit(): void {
    this.alert = false;
  }

  onSubmit() {
    if (this.searchForm.valid) {
      if (this.searchForm.value.country !== '') {
        if (typeof this.searchForm.value.country === 'string') {
          this.availableLocationsSubscription = this.availableLocationsService
            .availableLocations(this.searchForm.value.country)
            .subscribe(
              (res) => {
                this.availableLocationsService.data.next(res);
              },
              (err) => {
                this.alert = true;
                this.text = err;
                throw new Error(err);
              }
            );

          this.logKeywordsSubscription = this.logUserDataService
            .logKeywords(this.searchForm.value.country)
            .subscribe(
              (data) => data,
              (err) => {
                this.alert = true;
                this.text = err;
                throw new Error(err);
              }
            );
          this.searchForm.reset();
        }
      }
    }
  }

  ngOnDestroy(): void {
    this.availableLocationsSubscription.unsubscribe();
    this.logKeywordsSubscription.unsubscribe();
  }
  // pasiimti duomenis kai resetinamas psl yra grazinti visus rezultatus is db
}
