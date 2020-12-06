import { MidiButtonData } from './button/MidiButtonModel';
import { Hsl } from '../utils/Hsl';
import { MidiRowData, MidiRowDto } from './row/MidiRowModel';
import { InstrumentData, InstrumentDto } from './instrument/InstrumentModel';
import { InstrumentService } from './instrument/instrument.service';

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

    rows: MidiRowData[] = []

    constructor(rowLength?: number) {

        this.rowLength = rowLength ? rowLength : 0;
    }

    createRow(instrument: InstrumentData): MidiRowData {

        let rowIndex = this.rows.length;
        let row = new MidiRowData(instrument, this.rowColors[rowIndex], this.rowLength);
        
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
    static fromDto(dto: MidiDto, instrumentService: InstrumentService): MidiModel {

        let rowLength = dto.rows[0].buttons.length;
    
        let midi = new MidiModel(rowLength);
            midi.id = dto.id;
            midi.name = dto.name;

        dto.rows.forEach(rowDto => {
            
            instrumentService.findById(rowDto.instrument).subscribe(instrument => {

                let row = midi.createRow(instrument);
                
                rowDto.buttons.forEach((button, index) => row.buttons[index].active = button == 1)
           
                midi.rows.sort((a, b) => a.instrument.id - b.instrument.id);
            })
        });

        return midi;
    }
}

export interface MidiDto {

    id?: number
    name: string
    rows: Array<MidiRowDto>
}

/* colors

new MidiButtonData("rgba(255, 190, 11, 1)", new Audio()),
new MidiButtonData("rgba(251, 86, 7, 1)", new Audio()),
new MidiButtonData("rgba(255, 0, 110, 1)", new Audio()),
new MidiButtonData("rgba(131, 56, 236, 1)", new Audio()),
new MidiButtonData("rgba(58, 134, 255, 1)", new Audio()),

*/