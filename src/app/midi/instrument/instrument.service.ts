import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { InstrumentData, InstrumentDto } from './InstrumentModel';

@Injectable({
    providedIn: 'root'
})
export class InstrumentService {

    constructor(private http: HttpClient) {
        
    }

    findById(id: number) {

        return this.http.get<InstrumentDto>("http://localhost:8080/instrument/"+id)
            .pipe(map(dto => InstrumentData.fromDto(dto)));
    }
    
    findAll() {

        return this.http.get<Array<InstrumentDto>>("http://localhost:8080/instrument")
            .pipe(map((rawArray:Array<InstrumentDto>) => rawArray.map(dto => InstrumentData.fromDto(dto))));
    }
}