export class LampModel {
    Location?: string;
    bright?: number;
    color_mode?: number;
    ct?: number;
    host?: string;
    hue?: number;
    id?: string;
    model?: string;
    port?: number;
    power?: string;
    rgb?: number;
    sat?: number;
    support?: number;

    constructor(options: any) {
        this.Location = options.Location;
        this.bright = options.bright;
        this.color_mode = options.color_mode;
        this.ct = options.ct;
        this.host = options.host;
        this.hue = options.hue;
        this.id = options.id;
        this.model = options.model;
        this.port = options.port;
        this.power = options.power;
        this.rgb = options.rgb;
        this.sat = options.sat;
        this.support = options.support;
    }
}

