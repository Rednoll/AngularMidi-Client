import { Component, Input } from '@angular/core';
import { MidiButtonData } from './MidiButtonModel';
import { Hsl } from 'src/app/utils/Hsl';
import { MidiRowData } from '../row/MidiRowModel';
import { InstrumentData } from '../instrument/InstrumentModel';

@Component({
  selector: 'app-midi-button',
  templateUrl: './midi-button.component.html',
  styleUrls: ['./midi-button.component.css']
})
export class MidiButtonComponent {

    @Input() public button: MidiButtonData = new MidiButtonData(MidiRowData.EMPTY);

    click() {

        this.button.active = !this.button.active;
    }
}