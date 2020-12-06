import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InstrumentRepository } from 'src/app/io/instrument.repository';
import { MidiRepository } from 'src/app/io/midi.repository';

@Injectable({
    providedIn: 'root'
})
export class InstrumentService {

    constructor(private http: HttpClient, public repository: InstrumentRepository) {

    }

    findById(id: number) {

        return this.repository.findById(id);
    }
    
    findAll() {

        return this.repository.findAll();
    }
}
