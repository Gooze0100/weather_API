import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AvailableLocationsService } from 'src/app/services/available-locations.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  @ViewChild('form') searchForm: NgForm;

  constructor(private availableLocationsService: AvailableLocationsService) {}
  ngOnInit(): void {}

  onSubmit() {
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
    if (this.searchForm.value.country !== '') {
      this.searchForm.reset();
    }
  }
  // pasiimti duomenis kai resetinamas psl yra grazinti visus rezultatus is db
}
