import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultComponentComponent } from './default.component';

describe('DefaultComponentComponent', () => {
  let component: DefaultComponentComponent;
  let fixture: ComponentFixture<DefaultComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DefaultComponentComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
