import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { epgpService } from '../service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../players-add-dialog/players-add-dialog.component';

@Component({
  selector: 'app-players-add-epgp',
  templateUrl: './players-add-epgp.component.html',
  styleUrls: ['./players-add-epgp.component.scss']
})
export class PlayersAddEpgpComponent implements OnInit {

  public formGroup!: FormGroup;

  public player: any;

  constructor(
    private _builder: FormBuilder,
    private _service: epgpService,
    public dialogRef: MatDialogRef<PlayersAddEpgpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit(): void {
    this.player = this.data ? (this.data as any).player : null;

    this.formGroup = this._builder.group({
      reason: '',
      ep: 0,
      gp: 0,
    });

    this.formGroup
      .valueChanges
      .subscribe(data => {
        this.data = data;
      });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
