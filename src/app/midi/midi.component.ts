import { Component, Input } from '@angular/core';
import { InstrumentService } from './instrument/instrument.service';
import { MidiService } from './midi.service';
import { MidiModel } from './Midi';

@Component({
  selector: 'app-midi',
  templateUrl: './midi.component.html',
  styleUrls: ['./midi.component.css']
})
export class MidiComponent {

    constructor(public midiService: MidiService) {
        
    }

    saveMidi() {

        this.midiService.saveCurrentMidi();
    }
}