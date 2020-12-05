export class InstrumentData {

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

    static fromDto(dto: InstrumentDto): InstrumentData {

        return new InstrumentData(dto.id, dto.name);
    }
}

export interface InstrumentDto {

    id: number
    name: string
}