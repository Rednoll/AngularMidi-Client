export class MidisListData {

    midis: string[]

    constructor(midis: string[]) {

        this.midis = midis;
    }

    toDto(): MidisListDto {

        return {

            midis: this.midis
        }
    }

    static fromArray(arr: string[]): MidisListData {
    
        return new MidisListData(arr);
    }

    static fromDto(dto: MidisListDto): MidisListData {

        return new MidisListData(dto.midis);
    }
}

export interface MidisListDto {

    midis: string[]
}