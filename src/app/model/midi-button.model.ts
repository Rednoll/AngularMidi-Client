import { MidiRowModel } from './midi-row.model';

export class MidiButtonModel {

    row: MidiRowModel
    active: boolean = false
    playing: boolean = false

    constructor(row: MidiRowModel) {

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