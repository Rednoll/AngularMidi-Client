import { Component } from '@angular/core';
import { InstrumentService } from 'src/app/midi/instrument/instrument.service';
import { MidiService } from 'src/app/midi/midi.service';
import { MidiModel } from 'src/app/midi/Midi';

@Component({

    selector: 'app-midis-data-control',
    templateUrl: './midis-data-control.component.html',
    styleUrls: ['./midis-data-control.component.css']
})
export class MidisDataControlComponent {

    constructor(private midiService: MidiService, private instrumentService: InstrumentService) {

    }

    save() {

        this.midiService.saveCurrentMidi();
    }

    add() {

        this.midiService.viewEmpty(true);
    }

    delete() {

        this.midiService.deleteCurrentMidi();
    }

    fork() {

        let forkedMidi = MidiModel.fromDto(this.midiService.currentMidi.toDto(), this.instrumentService);
            forkedMidi.id = -1;
            forkedMidi.name += "-Fork"

        this.midiService.save(forkedMidi);
        this.midiService.updateCurrentMidi(forkedMidi);
    }
}
