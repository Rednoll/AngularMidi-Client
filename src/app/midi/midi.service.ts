import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MidiData, MidiDto } from './MidiModel';
import { MidiRowDto } from './row/MidiRowModel';
import { map } from 'rxjs/operators';
import { InstrumentService } from './instrument/instrument.service';

@Injectable({
    providedIn: 'root'
})
export class MidiService {

    constructor(private http: HttpClient, private instrumentService: InstrumentService) { 


    }

    save(midi: MidiData) {

        this.http.post("http://localhost:8080/midi", midi.toDto()).subscribe();
    }

    findById(id: number) {

        return this.http.get<MidiDto>("http://localhost:8080/midi/"+id)
            .pipe(map(dto => MidiData.fromDto(dto, this.instrumentService)));
    }
}