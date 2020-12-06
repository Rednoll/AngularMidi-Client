import { Component } from '@angular/core';
import { MidiService } from './midi/midi.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

    title = 'test-client'

    constructor(public midiService: MidiService) {

    }

    testSaveCurrent() {

        this.midiService.saveCurrentMidi();
    }

    nameChanged(event: any) {

        this.midiService.currentMidi.name = event.target.value;
    }
}