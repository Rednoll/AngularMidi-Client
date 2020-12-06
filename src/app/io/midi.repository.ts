import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { MidiListUnitDto } from 'src/app/io/dto/midi-list-unit.dto';
import { MidiModel } from 'src/app/model/midi.model';
import { MidiDto } from "src/app/io/dto/midi.dto";
import { InstrumentRepository } from './instrument.repository';
import { environment } from 'src/environments/environment'

@Injectable({
    providedIn: 'root'
})
export class MidiRepository {

    baseUrl: string = environment.baseUrl

    constructor(private http: HttpClient, private instrumentRepository: InstrumentRepository) {

    }

    fetchList() {

        return this.http.get<Array<MidiListUnitDto>>(this.baseUrl+"/midi/list");
    }

    delete(midi: MidiModel, callback?: ()=> any) {

        if(!midi.id) return;

        return this.http.delete(this.baseUrl+"/midi/"+midi.id).subscribe(()=> {
            if(callback) callback();
        });
    }

    save(midi: MidiModel, callback?: ()=> any) {

        if(midi.name == "" || !midi.name) return;

        this.http.post<number>(this.baseUrl+"/midi", midi.toDto()).subscribe((id)=> {
            midi.id = id;
            if(callback) callback();
        });
    }

    findByName(name: string) {

        return this.http.get<MidiDto>(this.baseUrl+"/midi/"+name)
            .pipe(map(dto => MidiModel.fromDto(dto, this.instrumentRepository)));
    }

    findById(id: number) {

        return this.http.get<MidiDto>(this.baseUrl+"/midi/"+id)
            .pipe(map(dto => MidiModel.fromDto(dto, this.instrumentRepository)));
    }
}