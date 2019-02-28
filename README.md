[![Make a pull request][prs-badge]][prs]
[![License](http://img.shields.io/badge/Licence-GNU-brightgreen.svg)](LICENSE.md)

# Smart Lights for Yeelight
# Introduction

Smart Lights for Yeelight is created to control your bulbs in form of a Mac OS tray app.
The user interface is kept simple and clean to integrate seamlessly in your OSX device.

<img src="https://user-images.githubusercontent.com/43359029/53537018-d0c72500-3b08-11e9-934c-3bb97e7d953e.png" width="500"/>

## Usage

To be able to use this tool, you need to set your Yeelight device in LAN-Control mode at first. 
This enables the device control through your local network. Vice Versa the client needs to be in
the same network. Use the Yeelight App on your smartphone to activate this option. 

## Direct Download
* <summary><a href="https://github.com/ishiharas/Smart-Lights-Yeelight/releases/latest">Latest Release</a></summary>

## Getting Started

[![Angular Logo](https://www.vectorlogo.zone/logos/angular/angular-icon.svg)](https://angular.io/) [![Electron Logo](https://www.vectorlogo.zone/logos/electronjs/electronjs-icon.svg)](https://electronjs.org/)

This project is build with Angular and Electron.
I had only the possibility to test the tool with one 
Yeelight RGB Bulb. In case of strange application behaviour, 
please let me know through the issue tracker. In case you want to make your own adjustments, you have to following options.

Clone this repository locally :

``` bash
git clone https://github.com/ishiharas/smart-lights-yeelight.git
```

Install dependencies with npm :

``` bash
npm install
```

## To build for development

- **in a terminal window** -> npm start


## Included Commands

|Command|Description|
|--|--|
|`npm run electron:mac`|  On a MAC OS, builds your application and generates a `.app` file of your application that can be run on Mac |


[license-badge]: https://img.shields.io/badge/license-Apache2-blue.svg?style=flat
[license]: https://github.com/ishiharas/smart-lights-yeelight/blob/master/LICENSE.md
[prs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[prs]: http://makeapullrequest.com