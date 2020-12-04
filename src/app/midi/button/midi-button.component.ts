import { Component, Input } from '@angular/core';
import { MidiButtonData } from './MidiButtonData';

@Component({
  selector: 'app-midi-button',
  templateUrl: './midi-button.component.html',
  styleUrls: ['./midi-button.component.css']
})
export class MidiButtonComponent {

  @Input() button: MidiButtonData = new MidiButtonData("", new Audio())

  click() {

    this.button.active = !this.button.active;
  }
}