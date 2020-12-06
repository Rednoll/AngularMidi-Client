import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MidiListUnitDto } from 'src/app/io/dto/midi-list-unit.dto';
import { MidiModel } from 'src/app/model/midi.model';
import { MidiRepository } from 'src/app/io/midi.repository';
import { InstrumentService } from './instrument.service';

@Injectable({
    providedIn: 'root'
})
export class MidiService {

    defaultRowLenght: number = 8;
    currentMidi: MidiModel = new MidiModel(this.defaultRowLenght);
    clockGenerator: any
    playState: PlayState = PlayState.STOP

    midisList: MidiListUnitDto[] = []

    constructor(private http: HttpClient, public midiRepository: MidiRepository, public instrumentService: InstrumentService) { 

        this.viewEmpty(true);
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

        return this.midiRepository.fetchList();
    }

    deleteCurrentMidi() {

        this.delete(this.currentMidi, ()=> this.viewEmpty(false));
    }

    delete(midi: MidiModel, callback?: ()=> any) {

        return this.midiRepository.delete(midi, ()=> {
            
            if(callback) callback();
            this.updateMidisList()
        });
    }

    saveCurrentMidi() {

        this.save(this.currentMidi);
    }

    save(midi: MidiModel) {

        return this.midiRepository.save(midi, ()=> this.updateMidisList());
    }

    findByName(name: string) {

        return this.midiRepository.findByName(name);
    }

    findById(id: number) {

        return this.midiRepository.findById(id);
    }
}

export enum PlayState {

    PLAY = "play",
    LOOP = "loop",
    STOP = "stop"
}