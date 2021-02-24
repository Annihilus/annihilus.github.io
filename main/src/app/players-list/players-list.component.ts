import { Component, OnInit, ViewChild, AfterViewInit, Input } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import { epgpService, playerData } from '../service';
import { MatDialog } from '@angular/material/dialog';

import { PlayersAddDialogComponent } from '../players-add-dialog/players-add-dialog.component';

@Component({
  selector: 'app-players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.scss']
})
export class PlayersListComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort) sort!: MatSort;

  @Input() public index: number = 0;

  public data: MatTableDataSource<any> = new MatTableDataSource<any>([]);

  public displayedColumns: string[] = ['name', 'description', 'ep', 'gp', 'pr', 'actions'];

  constructor(
    private _dialog: MatDialog,
    private _service: epgpService,
  ) { }

  ngOnInit(): void {
    this._service.data
      .subscribe(data => {
        this.data = new MatTableDataSource<any>(data[this.index]);
        console.log(data);
      })
  }

  ngAfterViewInit() {
    this.data.sort = this.sort;
  }

  public changeParams(player: playerData) {
    const dialogRef = this._dialog
      .open(PlayersAddDialogComponent, {
        width: '270px',
        data: { player }
      });

    dialogRef
      .afterClosed()
      .subscribe(data => {
        this._service.editPlayer(player.name, this.index, data);
      });
  }

}
