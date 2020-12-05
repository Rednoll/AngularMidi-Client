import { Component, Input } from '@angular/core';
import { InstrumentService } from './instrument/instrument.service';
import { MidiService } from './midi.service';
import { MidiData } from './MidiModel';

@Component({
  selector: 'app-midi',
  templateUrl: './midi.component.html',
  styleUrls: ['./midi.component.css']
})
export class MidiComponent {

    midi: MidiData

    constructor(private midiService: MidiService, private instrumentService: InstrumentService) {
        
        this.midi = new MidiData(8);

        midiService.findById(6).subscribe(midi => {
            
            this.midi = midi;
            this.midi.launch();
        });
        
        //instrumentService.findAll().subscribe(instruments => instruments.forEach(instrument => this.midi.createRow(instrument)));
    }

    saveMidi() {

        this.midiService.save(this.midi);
    }
}