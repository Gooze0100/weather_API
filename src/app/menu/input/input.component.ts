import {
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
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
  protected _logKeywordsSubscription: Subscription;
  public navBarFixed: boolean;
  constructor(private logUserDataService: LogUserService) {}

  ngOnInit(): void {}

  @HostListener('window:scroll', ['$event']) onScroll() {
    if (window.scrollY > 100) {
      this.navBarFixed = true;
    } else {
      this.navBarFixed = false;
    }
  }

  /**
   * onSubmit subscribes to logUserDataService service - logKeywords function
   * @throws {Error} when subscription is not successful
   * Resets searchForm
   */
  onSubmit(): void {
    if (this.searchForm.valid) {
      if (this.searchForm.value.country !== '') {
        this._logKeywordsSubscription = this.logUserDataService
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
    this._logKeywordsSubscription.unsubscribe();
  }
}
