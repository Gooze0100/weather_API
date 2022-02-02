import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchedLocationsComponent } from './searched-locations.component';

describe('SearchedLocationsComponent', () => {
  let component: SearchedLocationsComponent;
  let fixture: ComponentFixture<SearchedLocationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchedLocationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchedLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
