import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayersAddDialogComponent } from './players-add-dialog.component';

describe('PlayersAddDialogComponent', () => {
  let component: PlayersAddDialogComponent;
  let fixture: ComponentFixture<PlayersAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayersAddDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayersAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
