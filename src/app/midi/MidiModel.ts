import { MidiButtonData } from './button/MidiButtonModel';
import { Hsl } from '../utils/Hsl';
import { MidiRowData, MidiRowDto } from './row/MidiRowModel';
import { InstrumentData, InstrumentDto } from './instrument/InstrumentModel';
import { InstrumentService } from './instrument/instrument.service';

export class MidiData {
 
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

    interval: any

    constructor(rowLength?: number) {

        this.rowLength = rowLength ? rowLength : 0;
    }

    launch() {

        if(this.interval) return;

        this.interval = setInterval(()=> this.play(), 200*(this.rowLength));
    }

    stop() {

        clearInterval(this.interval);
    }

    createRow(instrument: InstrumentData): MidiRowData {

        let rowIndex = this.rows.length;
        let row = new MidiRowData(instrument, this.rowColors[rowIndex], this.rowLength);
        
        this.rows.push(row);

        return row;
    }

    play() {
        //...
        for(let column = 0; column < this.rowLength; column++) {

            let delay = 150 * (column + 1);

            setTimeout(()=> {
            
                for(let row = 0; row < this.rows.length; row++) {
                    
                    this.rows[row].buttons[column].prePlay();
                }

                setTimeout(()=> {
            
                    for(let row = 0; row < this.rows.length; row++) {
                    
                        this.rows[row].buttons[column].play();
                    }

                    setTimeout(()=> {
            
                        for(let row = 0; row < this.rows.length; row++) {
                    
                            this.rows[row].buttons[column].postPlay();
                        }
        
                    }, 100);
    
                }, 100);

            }, delay);
        }
    }

    toDto(): MidiDto {

        let body: MidiDto = {

            id: this.id,
            name: "test",
            rows: this.rows.map(row => row.toDto())
        }

        return body;
    }

    //async load!
    static fromDto(dto: MidiDto, instrumentService: InstrumentService): MidiData {

        let rowLength = dto.rows[0].buttons.length;
    
        let midi = new MidiData(rowLength);
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