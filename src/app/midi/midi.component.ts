import { Component, Input, OnInit } from '@angular/core';
import { MidiData } from './MidiData';

@Component({
  selector: 'app-midi',
  templateUrl: './midi.component.html',
  styleUrls: ['./midi.component.css']
})
export class MidiComponent implements OnInit {

    midi: MidiData = new MidiData(8);

    ngOnInit(): void {
        
        this.midi.launch();
    }
}

//color 0: rgba(255, 190, 11, 1)
//color 1: rgba(251, 86, 7, 1)
//color 2: rgba(255, 0, 110, 1)
//color 3: rgba(131, 56, 236, 1)
//color 4: rgba(58, 134, 255, 1)
