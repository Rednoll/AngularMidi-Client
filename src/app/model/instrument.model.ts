import { InstrumentDto } from '../io/dto/instrument.dto';

export class InstrumentModel {

    static EMPTY: InstrumentModel = new InstrumentModel(-1, "");

    id: number
    name: string
    audio: HTMLAudioElement

    constructor(id: number, name: string) {

        this.id = id;
        this.name = name;

        this.audio = new Audio();
        this.audio.src = "http://localhost:8080/instrument/sample/"+this.id
        this.audio.volume = 0.125;
        this.audio.load();
    }

    static fromDto(dto: InstrumentDto): InstrumentModel {

        return new InstrumentModel(dto.id, dto.name);
    }
}

