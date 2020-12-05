import { Component, Input } from '@angular/core';
import { MidiService } from 'src/app/midi/midi.service';
import { MidisListData } from './MidisListModel';

@Component({
  selector: 'app-midis-list',
  templateUrl: './midis-list.component.html',
  styleUrls: ['./midis-list.component.css']
})
export class MidisListComponent {

    @Input() list: MidisListData = new MidisListData([]);

    constructor(private midiService: MidiService) { 
        
        this.update();
    }

    select(value: string) {

        this.midiService.findByName(value).subscribe(midi => this.midiService.updateCurrentMidi(midi));
    }

    update() {

        this.midiService.fetchList().subscribe(list=> {

            this.list = list;
        })
    }
}
