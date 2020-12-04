import { MidiButtonData } from './button/MidiButtonData';

export class MidiData {
 
    buttons: MidiButtonData[] = []
    rowLength: number

    buttonExamples: MidiButtonData[] = []

    constructor(rowLength: number) {

        let audio = new Audio();
            audio.src = "http://localhost:8080/music/hat";
            audio.volume = 0.25;
        audio.load();

        this.buttonExamples.push(new MidiButtonData("rgba(255, 190, 11, 1)", audio));

        audio = new Audio();
            audio.src = "http://localhost:8080/music/kick";
            audio.volume = 0.25;
        audio.load();

        this.buttonExamples.push(new MidiButtonData("rgba(251, 86, 7, 1)", audio));

        audio = new Audio();
            audio.src = "http://localhost:8080/music/perc";
            audio.volume = 0.25;
            audio.load();

        this.buttonExamples.push(new MidiButtonData("rgba(255, 0, 110, 1)", audio));

        audio = new Audio();
            audio.src = "http://localhost:8080/music/cymbal";
            audio.volume = 0.25;
            audio.load();

        this.buttonExamples.push(new MidiButtonData("rgba(131, 56, 236, 1)", audio));

        audio = new Audio();
            audio.src = "http://localhost:8080/music/piano";
            audio.volume = 0.25;
            audio.load();

        this.buttonExamples.push(new MidiButtonData("rgba(58, 134, 255, 1)", audio));

        this.rowLength = rowLength;
        this.addRow();
        this.addRow();
        this.addRow();
        this.addRow();
        this.addRow();
    }

    launch() {

        setInterval(()=> this.play(), 200*(this.rowLength+1));
    }

    addRow() {

        let rowIndex = Math.trunc(this.buttons.length / this.rowLength);

        for(let i = 0; i < this.rowLength; i++) {
         
            let color = this.buttonExamples[rowIndex].color;
            let audio = this.buttonExamples[rowIndex].audio;

            this.buttons.push(new MidiButtonData(color, audio));
        }    
    }

    play() {

        let rowsCount = Math.trunc(this.buttons.length / this.rowLength);

        //...
        for(let column = 0; column < this.rowLength; column++) {

            setTimeout(()=> {
            
                for(let row = 0; row < rowsCount; row++) {
                    
                    this.buttons[row*this.rowLength + column].play();
                }

            }, 200*(column + 1));
        }
    }
}

/* colors

new MidiButtonData("rgba(255, 190, 11, 1)", new Audio()),
new MidiButtonData("rgba(251, 86, 7, 1)", new Audio()),
new MidiButtonData("rgba(255, 0, 110, 1)", new Audio()),
new MidiButtonData("rgba(131, 56, 236, 1)", new Audio()),
new MidiButtonData("rgba(58, 134, 255, 1)", new Audio()),

*/