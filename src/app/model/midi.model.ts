import { Hsl } from '../utils/hsl.utils';
import { MidiRowModel } from './midi-row.model';
import { InstrumentModel } from './instrument.model';
import { InstrumentRepository } from 'src/app/io/instrument.repository';
import { MidiDto } from '../io/dto/midi.dto';

export class MidiModel {
 
    id: number | undefined
    name: string = ""

    rowLength: number

    rowColors: Hsl[] = [

        new Hsl(44, 100, 52),
        new Hsl(19, 97, 51),
        new Hsl(334, 100, 50),
        new Hsl(265, 83, 57),
        new Hsl(217, 100, 61)
    ]

    rows: MidiRowModel[] = []

    constructor(rowLength?: number) {

        this.rowLength = rowLength ? rowLength : 0;
    }

    createRow(instrument: InstrumentModel): MidiRowModel {

        let rowIndex = this.rows.length;
        let row = new MidiRowModel(instrument, this.rowColors[rowIndex], this.rowLength);
        
        this.rows.push(row);

        return row;
    }

    play(columnIndex: number) {

        for(let row = 0; row < this.rows.length; row++) {
            
            this.rows[row].buttons[columnIndex].prePlay();
        }

        setTimeout(()=> {
    
            for(let row = 0; row < this.rows.length; row++) {
            
                this.rows[row].buttons[columnIndex].play();
            }

            setTimeout(()=> {
    
                for(let row = 0; row < this.rows.length; row++) {
            
                    this.rows[row].buttons[columnIndex].postPlay();
                }

            }, 100);

        }, 100);
    }

    toDto(): MidiDto {

        let body: MidiDto = {

            id: this.id,
            name: this.name,
            rows: this.rows.map(row => row.toDto())
        }

        return body;
    }

    //async load!
    static fromDto(dto: MidiDto, instrumentRepository: InstrumentRepository): MidiModel {

        let rowLength = dto.rows[0].buttons.length;
    
        let midi = new MidiModel(rowLength);
            midi.id = dto.id;
            midi.name = dto.name;

        dto.rows.forEach(rowDto => {
            
            instrumentRepository.findById(rowDto.instrument).subscribe(instrument => {

                let row = midi.createRow(instrument);
                
                rowDto.buttons.forEach((button, index) => row.buttons[index].active = button == 1)
           
                midi.rows.sort((a, b) => a.instrument.id - b.instrument.id);
            })
        });

        return midi;
    }
}