import { Component, Input } from '@angular/core';
import { MidisListData } from './MidisListModel';

@Component({
  selector: 'app-midis-list',
  templateUrl: './midis-list.component.html',
  styleUrls: ['./midis-list.component.css']
})
export class MidisListComponent {

    @Input() list: MidisListData | undefined;

    constructor() { 
        
        this.list = new MidisListData(["One", "Two", "Three", "Three", "Three", "Three", "Three", "Three", "Three", "Three", "Three", "Three", "Three"]);
    }
}
