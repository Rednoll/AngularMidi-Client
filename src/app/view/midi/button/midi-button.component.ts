import { Component, Input } from '@angular/core';

import { MidiButtonModel } from 'src/app/model/midi-button.model';
import { MidiRowModel } from 'src/app/model/midi-row.model';

@Component({
  selector: 'app-midi-button',
  templateUrl: './midi-button.component.html',
  styleUrls: ['./midi-button.component.css']
})
export class MidiButtonComponent {

    @Input() public button: MidiButtonModel = new MidiButtonModel(MidiRowModel.EMPTY);

    click() {

        this.button.active = !this.button.active;
    }
}