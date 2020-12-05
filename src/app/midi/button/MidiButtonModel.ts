import { Hsl } from 'src/app/utils/Hsl'
import { MidiRowData } from '../row/MidiRowModel';

export class MidiButtonData {

    row: MidiRowData
    active: boolean = false
    playing: boolean = false

    constructor(row: MidiRowData) {

        this.row = row;
    }

    prePlay() {

        if(!this.active) return;

        this.playing = true;
    }

    play() {

        if(!this.active) return;
            
        this.row.instrument.audio.pause();
        this.row.instrument.audio.currentTime = 0;
        this.row.instrument.audio.play();
    }

    postPlay() {

        this.playing = false;
    }
}