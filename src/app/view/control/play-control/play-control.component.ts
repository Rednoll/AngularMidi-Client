import { Component } from '@angular/core';
import { MidiService } from 'src/app/service/midi.service';

@Component({
  selector: 'app-play-control',
  templateUrl: './play-control.component.html',
  styleUrls: ['./play-control.component.css']
})
export class PlayControlComponent {

    constructor(public midiService: MidiService) {

        
    }

    changeState(value: string) {

        if(value == "play") this.midiService.play();
        if(value == "loop") this.midiService.loop();
        if(value == "stop") this.midiService.stop();
    }
}
