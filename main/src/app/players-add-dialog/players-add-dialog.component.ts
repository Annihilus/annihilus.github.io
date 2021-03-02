import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { epgpService } from '../service';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-players-add-dialog',
  templateUrl: './players-add-dialog.component.html',
  styleUrls: ['./players-add-dialog.component.scss']
})
export class PlayersAddDialogComponent implements OnInit {

  public formGroup!: FormGroup;

  public player: any;

  constructor(
    private _builder: FormBuilder,
    private _service: epgpService,
    public dialogRef: MatDialogRef<PlayersAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    const defaults = this._service.settings;
    this.player = this.data ? (this.data as any).player : null;

    (this.data as any) = {
      name: 'test',
      ep: 100,
      gp: defaults.minGP,
    }

    if (!this.player) {
      this.formGroup = this._builder.group({
        name: 'test',
        ep: 100,
        gp: defaults.minGP,
        description: '',
      });
    } else {
      this.formGroup = this._builder.group({
        name: this.player.name,
        gp: this.player.gp || defaults.minGP,
        description: this.player.description,
      });
    }

    this.formGroup
      .valueChanges
      .subscribe(data => {
        (this.data as any) = {
          name: data.name,
          description: data.description,
          ep: parseInt(data.ep, 0),
          gp: parseInt(data.gp, 0),
        };
      });

  }

}
