import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { InstrumentModel } from 'src/app/model/instrument.model';
import { InstrumentDto } from "src/app/io/dto/instrument.dto";
import { environment } from 'src/environments/environment'

@Injectable({
    providedIn: 'root'
})
export class InstrumentRepository {

    cache: Map<number, InstrumentModel> = new Map()
    baseUrl: string = environment.baseUrl

    constructor(private http: HttpClient) {
        
    }

    findById(id: number) {

        return this.http.get<InstrumentDto>(this.baseUrl+"/instrument/"+id)
            .pipe(map(dto => {
                
                if(this.cache.has(dto.id)) {
                    
                    let val = this.cache.get(dto.id);
                    if(val) return val;
                }

                let model = InstrumentModel.fromDto(dto)
            
                this.cache.set(id, model);

                return model;
            }));
    }
    
    findAll() {

        return this.http.get<Array<InstrumentDto>>(this.baseUrl+"/instrument")
            .pipe(map((rawArray:Array<InstrumentDto>) => rawArray.map(dto => {
                
                if(this.cache.has(dto.id)) {
                    
                    let val = this.cache.get(dto.id);
                    if(val) return val;
                }

                let model = InstrumentModel.fromDto(dto)
            
                this.cache.set(model.id, model);

                return model;
            })));
    }
}