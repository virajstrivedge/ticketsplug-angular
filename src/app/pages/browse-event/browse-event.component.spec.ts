import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseEventComponent } from './browse-event.component';

describe('BrowseEventComponent', () => {
  let component: BrowseEventComponent;
  let fixture: ComponentFixture<BrowseEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrowseEventComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrowseEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
