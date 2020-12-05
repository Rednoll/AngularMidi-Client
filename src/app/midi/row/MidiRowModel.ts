import { Hsl } from 'src/app/utils/Hsl'
import { MidiButtonData } from '../button/MidiButtonModel';
import { InstrumentData } from '../instrument/InstrumentModel';

export class MidiRowData {

    color: Hsl
    instrument: InstrumentData

    buttons: MidiButtonData[] = []

    constructor(instrument: InstrumentData, color: Hsl, length: number) {

        this.instrument = instrument;
        this.color = color;
        
        for(let i = 0; i < length; i++)
            this.createButton();
    }

    createButton(): MidiButtonData {

        let button = new MidiButtonData(this);
    
        this.buttons.push(button);

        return button;
    }

    toDto(): MidiRowDto {

        return {

            instrument: this.instrument.id,
            buttons: this.buttons.map(button => button.active ? 1 : 0)
        };
    }
}

export interface MidiRowDto {

    instrument: number
    buttons: number[]
}