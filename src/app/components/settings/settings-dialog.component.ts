import { Component, OnInit, NgZone, Inject } from '@angular/core';
import { LampModel } from '../../models/lamp.model';
import { MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html'
})
export class SettingsDialogComponent {
    public lamp: LampModel;
    public value: string;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

    saveOption(): void {
      if (this.lamp) {
        const stored = {
          host: this.lamp.host,
          port: this.lamp.port,
          id: this.lamp.id
        };
        localStorage.setItem('lampConnection', JSON.stringify(stored));
        console.log('--- option saved ---');
      }
    }

    setNewSelection(lamp: LampModel): void {
      this.lamp = lamp;
      console.log('Selected: ' + lamp.host);
      }
}
