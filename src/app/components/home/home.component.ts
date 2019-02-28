import { Component, OnInit, NgZone } from '@angular/core';
import { Discovery, Device } from 'yeelight-platform';
import { LampModel } from '../../models/lamp.model';
import { faPowerOff, faSun, faCog } from '@fortawesome/free-solid-svg-icons';
import { SettingsDialogComponent } from '../settings/settings-dialog.component';
import { MatDialog } from '@angular/material';
import { ColorEvent } from 'ngx-color';
import { PropertiesModel } from '../../models/properties.model';
import { ElectronService } from '../../providers/electron.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  faPowerOff = faPowerOff;
  faSun = faSun;
  faCog = faCog;

  public lamp: Array<LampModel> = [];
  public properties: PropertiesModel;
  public discoveryService = new Discovery();
  public discoveryStarted = false;
  public toggle = false;
  public alreadyConnected = false;
  public discoveredDevice;

  public backgroundBlurred = false;
  public max = 100;
  public min = 1;
  public step = 1;
  public thumbLabel = true;
  public value = 45;

  public lampSetup;
  public colors = ['#edcc4d', '#f6dc7b', '#ffecaa', '#fff9d9', '#ffffff', '#c7e2f9', '#8cbede', '#6daccf', '#569fc4'];
  public selectedHue = {r: 0, g: 255, b: 255};
  public selectedCt = '#ffffff';

  constructor(
    private ngZone: NgZone,
    private dialog: MatDialog,
    public electronService: ElectronService) { }

  ngOnInit() {
    this.handleConnection();
  }

  discoverDevices(): void {
    this.ngZone.run( () => { });
    this.discoveryService.on('started', () => {
      console.log('--- discovery started ---');
    });

    this.discoveryService.listen();

    this.discoveryService.on('didDiscoverDevice', (device: LampModel) => {
      this.discoveryStarted = true;

      const found = this.lamp.some(function (el) {
        return el.host === device.host;
      });

      if (device.Location.startsWith('yee') && !found) {
          this.lamp.push(device);
      }
    });
  }

  connectDevice(): void {
    this.lampSetup = JSON.parse(localStorage.getItem('lampConnection'));
    if (this.lampSetup) {
      console.log('Host: ' + this.lampSetup.host);
      console.log('Port: ' + this.lampSetup.port);
      console.log('ID: ' + this.lampSetup.id);

      this.discoveredDevice = new Device({
        host: this.lampSetup.host,
        port: this.lampSetup.port,
        debug: true,
        interval: 1000
      });

      this.discoveredDevice.connect();

      this.discoveredDevice.on('connected', () => {
        console.log('--- connected --- to ' + this.lampSetup.host);
        this.alreadyConnected = true;
        this.getProperties();
      });

      this.discoveredDevice.on('disconnected', () => {
          console.log('--- disconnected ---');
          this.alreadyConnected = false;
          delete this.properties;
      });


    }
  }

  handleConnection(): void {
    const app = require('electron').remote.app;
    let timedDisconnect;

    app.on('browser-window-blur', () => {
      console.log('--- window blurred ---');
      console.log('--- start disconnect timer ---');
      timedDisconnect = setTimeout(() => {
        if (this.alreadyConnected) {
          this.discoveredDevice.disconnect();
          console.log('--- finished disconnect timer ---');
        }
      }, 10000);
    });

    app.on('browser-window-focus', () => {
      console.log('--- window focused ---');
      console.log('--- stop disconnect timer ---');
      clearTimeout(timedDisconnect);
      if (!this.alreadyConnected) {
        this.connectDevice();
      }
    });
  }

  openSettings(): void {
    const app = require('electron').remote.app;
    const menu = require('electron').remote.Menu.buildFromTemplate([{
      label: 'Find device',
      click: () => {
        this.findDevicesDialog();
      }
    },
     {
      type: 'separator'
    },
  {
    label: 'Quit Smart Lights',
    click: () => {
      app.quit();
    }
  }]);

    menu.popup();
  }

  findDevicesDialog(): void {
    if (!this.discoveryStarted) {
      this.discoverDevices();
    }

    this.backgroundBlurred = true;
    const dialogRef = this.dialog.open(SettingsDialogComponent, {
      width: '90%',
      panelClass: 'dialog-panel',
      data: this.lamp
    });
    dialogRef.afterClosed().subscribe(result => {
      this.backgroundBlurred = false;
      if (result === 'confirm') {
        if (this.discoveredDevice) {
          this.discoveredDevice.disconnect();
        }
          this.connectDevice();

      }
    });
  }

  sendCommand(method: string, param: any, style: string, time: number, paramTwo?: any): void {
    let parameter = [];
    if (paramTwo) {
      parameter = [param, paramTwo, style, time];
    } else {
      parameter = [param, style, time];
    }

    this.discoveredDevice.sendCommand({
      id: this.lampSetup.id,
      method: method,
      params: parameter
    });

  }

  getProperties(): void {
    this.discoveredDevice.on('deviceUpdate', (newProps) => {
      if (!this.properties && newProps.id === 199) {
        this.properties = {
          power: newProps.result[0],
          bright: newProps.result[1],
          rgb: newProps.result[2],
          hue: newProps.result[5],
          ct: newProps.result[7]
        };

        console.log('--- link catched properties of bulb to UI ---');
        this.toggle = (this.properties.power === 'on' ? true : false);
        this.value = Number(this.properties.bright);
        this.selectedHue = {
          r: Number(this.properties.rgb) / (256 * 256),
          g: (Number(this.properties.rgb) / 256) % 256,
          b: Number(this.properties.rgb) % 256
        };
        this.selectedCt = this.colors[(Number(this.properties.ct) - 1700) / 600];
      }
    });

  }

  togglePower(): void {
    let toggleParam: string;
    this.toggle = !this.toggle;

    if (this.toggle) {
      toggleParam = 'on';
    } else {
      toggleParam = 'off';
    }

    this.sendCommand('set_power', toggleParam, 'smooth', 300);
    console.log('Power: ' + toggleParam);
  }

  changeBrightness(event: any) {
    this.sendCommand('set_bright', event.value, 'smooth', 300);
    console.log('Brightness: ' + event.value);
  }

  changeSlider(event: ColorEvent) {
    this.sendCommand('set_hsv', parseInt(event.color.oldHue.toString(), 10), 'smooth', 150, 100);
    console.log('ColorHue: ' + parseInt(event.color.oldHue.toString(), 10));
  }

  changeTemperature(event: ColorEvent) {
    const newTemp = (this.colors.indexOf(event.color.hex) * 600) + 1700;
    this.sendCommand('set_ct_abx', newTemp, 'smooth', 300);
    console.log('Temperature: ' + newTemp);
  }

}
