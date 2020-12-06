export class Hsl {
 
    static EMPTY: Hsl = new Hsl(0, 0, 0);

    hue: number
    saturation: number
    lightness: number

    constructor(hue: number, saturation: number, lightness: number) {

        this.hue = hue;
        this.saturation = saturation;
        this.lightness = lightness;
    }

    addLightness(lightness: number) {

        return new Hsl(this.hue, this.saturation, this.lightness + lightness);
    }

    toCss() {

        return "hsl("+this.hue+", "+this.saturation+"%, "+this.lightness+"%)";
    }
}