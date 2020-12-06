import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MidiModel, MidiDto } from './Midi';
import { MidiRowDto } from './row/MidiRowModel';
import { map } from 'rxjs/operators';
import { InstrumentService } from './instrument/instrument.service';
import { MidiListDto } from '../control/midis-list/MidiListModel';

@Injectable({
    providedIn: 'root'
})
export class MidiService {

    defaultRowLenght: number = 8;
    currentMidi: MidiModel = new MidiModel(this.defaultRowLenght);
    clockGenerator: any
    playState: PlayState = PlayState.STOP

    midisList: MidiListDto[] = []

    constructor(private http: HttpClient, private instrumentService: InstrumentService) { 

        instrumentService.findAll().subscribe(instruments => instruments.forEach(instrument => this.currentMidi.createRow(instrument)));
    
        this.updateMidisList();
    }

    viewEmpty(byUpdate: boolean) {

        let midi = new MidiModel(8);

        this.instrumentService.findAll().subscribe(instruments => instruments.forEach(instrument => midi.createRow(instrument)));
    
        if(byUpdate) {
        
            this.updateCurrentMidi(midi);
        }
        else {

            this.currentMidi = midi;
        }
    } 

    updateCurrentMidi(midi: MidiModel) {

        this.saveCurrentMidi();
        this.stop();
        this.currentMidi = midi;
    }

    play() {

        if(this.playState == PlayState.STOP) {
            
            this.clockGenerator = this.recursivePlayTick(0);
        }

        this.playState = PlayState.PLAY;
    }

    loop() {

        if(this.playState == PlayState.STOP) {

            this.play();
        }

        this.playState = PlayState.LOOP;
    }

    stop() {

        clearTimeout(this.clockGenerator);

        this.playState = PlayState.STOP;
    }

    recursivePlayTick(columnIndex: number) {

        return setTimeout(()=> {
            
            this.currentMidi.play(columnIndex);

            if(columnIndex < this.currentMidi.rowLength - 1) {

                this.clockGenerator = this.recursivePlayTick(columnIndex+1);
            }
            else if(this.playState == PlayState.LOOP) {

                this.clockGenerator = this.recursivePlayTick(0);
            }
            else {

                this.stop();
            }

        }, 150);
    }

    updateMidisList() {

        this.fetchList().subscribe(list=> {

            this.midisList = list;
        })
    }

    fetchList() {

        return this.http.get<Array<MidiListDto>>("http://localhost:8080/midi/list");
    }

    deleteCurrentMidi() {

        this.delete(this.currentMidi, ()=> this.viewEmpty(false));
    }

    delete(midi: MidiModel, callback?: ()=> any) {

        if(!midi.id) return;

        return this.http.delete("http://localhost:8080/midi/"+midi.id).subscribe(()=> {
            this.updateMidisList()
            if(callback) callback();
        });
    }

    saveCurrentMidi() {

        this.save(this.currentMidi);
    }

    save(midi: MidiModel) {

        if(midi.name == "" || !midi.name) {

            return;
        }

        this.http.post<number>("http://localhost:8080/midi", midi.toDto()).subscribe((id)=> {
            this.updateMidisList();
            midi.id = id;
        });
    }

    findByName(name: string) {

        return this.http.get<MidiDto>("http://localhost:8080/midi/"+name)
            .pipe(map(dto => MidiModel.fromDto(dto, this.instrumentService)));
    }

    findById(id: number) {

        return this.http.get<MidiDto>("http://localhost:8080/midi/"+id)
            .pipe(map(dto => MidiModel.fromDto(dto, this.instrumentService)));
    }
}

export enum PlayState {

    PLAY = "play",
    LOOP = "loop",
    STOP = "stop"
}