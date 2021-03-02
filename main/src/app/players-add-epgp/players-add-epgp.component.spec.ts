import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayersAddEpgpComponent } from './players-add-epgp.component';

describe('PlayersAddEpgpComponent', () => {
  let component: PlayersAddEpgpComponent;
  let fixture: ComponentFixture<PlayersAddEpgpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayersAddEpgpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayersAddEpgpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
