export class PropertiesModel {
    power?: string;
    bright?: string;
    rgb?: string;
    flowing?: string;
    flow_params?: string;
    hue?: string;
    sat?: string;
    ct?: string;


    constructor(options: any) {
        this.power = options.power;
        this.bright = options.bright;
        this.rgb = options.rgb;
        this.flowing = options.flowing;
        this.flow_params = options.flow_params;
        this.hue = options.hue;
        this.sat = options.sat;
        this.ct = options.ct;
    }
}

