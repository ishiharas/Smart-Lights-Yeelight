import { app, BrowserWindow, Tray, nativeImage } from 'electron';
import * as path from 'path';
import * as url from 'url';

const assetsDirectory = path.join(__dirname, 'dist/assets');
let win, serve, tray;
const args = process.argv.slice(1);
serve = args.some(val => val === '--serve');


function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 350,
    height: 550,
    show: false,
    frame: false,
    fullscreenable: false,
    resizable: false,
    vibrancy: 'dark',
    webPreferences: {
      backgroundThrottling: false
    }
  });

  if (serve) {
    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/node_modules/electron`)
    });
    win.loadURL('http://localhost:4200');
  } else {
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }
}

function createTray() {
  const trayIcon = path.join(assetsDirectory, 'bulbTemplate.png');
  const nimage = nativeImage.createFromPath(trayIcon);
  tray = new Tray(nimage);

  tray.on('right-click', function (event) {
  });
  tray.on('double-click', toggleWindow);
  tray.on('click', function (event) {
    toggleWindow();

    // Show devtools when command clicked
    if (win.isVisible() && process.defaultApp && event.metaKey) {
      win.openDevTools({mode: 'detach'});
    }
  });
}

function getWindowPosition() {
  const windowBounds = win.getBounds();
  const trayBounds = tray.getBounds();

  // Center window horizontally below the tray icon
  const x = Math.round(trayBounds.x + (trayBounds.width / 2) - (windowBounds.width / 2));

  // Position window 4 pixels vertically below the tray icon
  const y = Math.round(trayBounds.y + trayBounds.height);

  return {x: x, y: y};
}


function toggleWindow() {
  if (win.isVisible()) {
    win.hide();
    tray.setHighlightMode('never');
  } else {
    showWindow();
    tray.setHighlightMode('always');
  }
}

function showWindow() {
  const position = getWindowPosition();
  win.setPosition(position.x, position.y, false);
  win.show();
  win.focus();
}

try {
  app.dock.hide();

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', () => {
    createTray();
    createWindow();
  });

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
      app.quit();
  });

  app.on('browser-window-blur', () => {
    win.hide();
    tray.setHighlightMode('never');
  });


} catch (e) {
  // Catch Error
  throw e;
}
