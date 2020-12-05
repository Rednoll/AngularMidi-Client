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

    static fromDto(dto: MidisListDto): MidisListData {

        return new MidisListData(dto.midis);
    }
}

export interface MidisListDto {

    midis: string[]
}