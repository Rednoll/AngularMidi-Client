import { Hsl } from '../utils/hsl.utils'
import { MidiButtonModel } from './midi-button.model';
import { InstrumentModel } from './instrument.model';
import { MidiRowDto } from '../io/dto/midi-row.dto';

export class MidiRowModel {

    static EMPTY: MidiRowModel = new MidiRowModel(InstrumentModel.EMPTY, Hsl.EMPTY, 0);

    color: Hsl
    instrument: InstrumentModel

    buttons: MidiButtonModel[] = []

    constructor(instrument: InstrumentModel, color: Hsl, length: number) {

        this.instrument = instrument;
        this.color = color;
        
        for(let i = 0; i < length; i++)
            this.createButton();
    }

    createButton(): MidiButtonModel {

        let button = new MidiButtonModel(this);
    
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

