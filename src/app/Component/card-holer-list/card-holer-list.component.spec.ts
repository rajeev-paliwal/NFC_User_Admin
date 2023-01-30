import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardHolerListComponent } from './card-holer-list.component';

describe('CardHolerListComponent', () => {
  let component: CardHolerListComponent;
  let fixture: ComponentFixture<CardHolerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardHolerListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardHolerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
