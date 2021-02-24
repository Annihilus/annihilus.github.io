import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';

import { epgpService } from './service';

import { PlayersAddDialogComponent } from './players-add-dialog/players-add-dialog.component';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'epgp';

  public data: BehaviorSubject<any> = new BehaviorSubject([]);

  public selected = new FormControl(0);

  constructor(
    private _service: epgpService,
    private _dialog: MatDialog,
  ) {}

  public decay() {
    this._service.decay();

    this.selected.setValue(this.data.getValue().length - 1);
  }

  ngOnInit() {
    this._service.data.subscribe(data => {
      this.data.next(data);
    });
  }

  public openAddingPlayerModal(index: number) {
    const dialogRef = this._dialog
      .open(PlayersAddDialogComponent, {
        width: '270px',
      });

    dialogRef
      .afterClosed()
      .subscribe(data => {
        this._service.addPlayer(data, index);
      });
  }
}
