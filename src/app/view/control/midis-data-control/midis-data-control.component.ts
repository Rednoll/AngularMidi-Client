import { Component } from '@angular/core';
import { MidiService } from 'src/app/service/midi.service';

import { MidiModel } from 'src/app/model/midi.model';

@Component({

    selector: 'app-midis-data-control',
    templateUrl: './midis-data-control.component.html',
    styleUrls: ['./midis-data-control.component.css']
})
export class MidisDataControlComponent {

    constructor(private midiService: MidiService) {

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

        let forkedMidi = MidiModel.fromDto(this.midiService.currentMidi.toDto(), this.midiService.instrumentService.repository);
            forkedMidi.id = -1;
            forkedMidi.name += "-Fork"

        this.midiService.save(forkedMidi);
        this.midiService.updateCurrentMidi(forkedMidi);
    }
}
