import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { AvailableLocationsService } from 'src/app/services/available-locations.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  @ViewChild('form') searchForm: NgForm;
  public results: Object[] = [];

  constructor(private locationServices: AvailableLocationsService) {}
  ngOnInit(): void {}

  onSubmit() {
    this.locationServices
      .availableLocations(this.searchForm.value.country)
      .subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
    if (this.searchForm.value.country !== '') {
      this.searchForm.reset();
    }
  }
  // pasiimti duomenis kai resetinamas psl yra grazinti visus rezultatus is db
}
