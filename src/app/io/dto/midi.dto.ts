import { MidiRowDto } from "./midi-row.dto";


export interface MidiDto {

    id?: number;
    name: string;
    rows: Array<MidiRowDto>;
}