import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MidiData, MidiDto } from './MidiModel';
import { MidiRowDto } from './row/MidiRowModel';
import { map } from 'rxjs/operators';
import { InstrumentService } from './instrument/instrument.service';
import { MidisListData } from '../control/midis-list/MidisListModel';

@Injectable({
    providedIn: 'root'
})
export class MidiService {

    currentMidi: MidiData = new MidiData(12);

    constructor(private http: HttpClient, private instrumentService: InstrumentService) { 

        instrumentService.findAll().subscribe(instruments => instruments.forEach(instrument => this.currentMidi.createRow(instrument)));
    }

    updateCurrentMidi(midi: MidiData) {

        this.currentMidi.stop();
        this.currentMidi = midi;
        this.currentMidi.launch();
    }

    fetchList() {

        return this.http.get<Array<string>>("http://localhost:8080/midi/names")
            .pipe(map((arr:Array<string>)=> MidisListData.fromArray(arr)));
    }

    saveCurrentMidi() {

        this.save(this.currentMidi);
    }

    save(midi: MidiData) {

        this.http.post("http://localhost:8080/midi", midi.toDto()).subscribe();
    }

    findByName(name: string) {

        return this.http.get<MidiDto>("http://localhost:8080/midi/"+name)
            .pipe(map(dto => MidiData.fromDto(dto, this.instrumentService)));
    }

    findById(id: number) {

        return this.http.get<MidiDto>("http://localhost:8080/midi/"+id)
            .pipe(map(dto => MidiData.fromDto(dto, this.instrumentService)));
    }
}