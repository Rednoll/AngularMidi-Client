import { Component, Input } from '@angular/core';
import { MidiService } from 'src/app/service/midi.service';

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