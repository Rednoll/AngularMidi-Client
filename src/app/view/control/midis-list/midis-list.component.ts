import { Component, Input } from '@angular/core';
import { MidiService } from 'src/app/service/midi.service';

@Component({
  selector: 'app-midis-list',
  templateUrl: './midis-list.component.html',
  styleUrls: ['./midis-list.component.css']
})
export class MidisListComponent {

    constructor(public midiService: MidiService) { 
        
    }

    select(id: number) {

        this.midiService.findById(id).subscribe(midi => this.midiService.updateCurrentMidi(midi));
    }
}
