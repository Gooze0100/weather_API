import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AvailableLocationsService } from 'src/app/services/available-locations.service';
import { LogUserService } from 'src/app/services/log-user.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  @ViewChild('form') searchForm: NgForm;

  constructor(
    private availableLocationsService: AvailableLocationsService,
    private logUserDataService: LogUserService
  ) {}
  ngOnInit(): void {
    this.logUserDataService.getAllKeywords();
  }

  onSubmit() {
    // gali sitas if neveikti nes nebandziau
    if (this.searchForm.valid) {
      this.availableLocationsService
        .availableLocations(this.searchForm.value.country)
        .subscribe(
          (res) => {
            this.availableLocationsService.data.next(res);
          },
          (err) => {
            throw new Error(err);
          }
        );
      this.logUserDataService.logKeywords(this.searchForm.value.country);
      if (this.searchForm.value.country !== '') {
        this.searchForm.reset();
      }
    }
  }
  // pasiimti duomenis kai resetinamas psl yra grazinti visus rezultatus is db
}
