import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LogUserService } from 'src/app/services/log-user.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit, OnDestroy {
  @ViewChild('form') searchForm: NgForm;
  private logKeywordsSubscription: Subscription;

  constructor(private logUserDataService: LogUserService) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.searchForm.valid) {
      if (this.searchForm.value.country !== '') {
        this.logKeywordsSubscription = this.logUserDataService
          .logKeywords(this.searchForm.value.country)
          .subscribe(
            () => {},
            (err) => {
              throw new Error(err);
            }
          );
        this.searchForm.reset();
      }
    }
  }

  ngOnDestroy(): void {
    this.logKeywordsSubscription.unsubscribe();
  }
}
