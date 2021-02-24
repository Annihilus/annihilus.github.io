import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { epgpService } from '../service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public formGroup!: FormGroup;

  constructor(
    private _builder: FormBuilder,
    private _service: epgpService,
  ) { }

  ngOnInit(): void {
    const settings = this._service.settings;

    this.formGroup = this._builder.group({
      minGP: settings.minGP,
      weekEP: settings.weekEP,
      decay: settings.decay,
    });

    this._service.settings = this.formGroup.getRawValue();

    this.formGroup
      .valueChanges
      .subscribe(data => {
        for (const [key, value] of Object.entries(data)) {
          if (typeof value === 'string') {
            data[key] = parseInt(value, 0);
          }

          if (value === null) {
            data[key] = 0;
          }
        }

        this._service.settings = data;
      });
  }
}
