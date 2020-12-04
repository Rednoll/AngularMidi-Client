import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  
  title = 'test-client';
  
  play() {

    let audio = new Audio();
    audio.src = "http://localhost:8080/music/ding";
    audio.load();

    setInterval(()=> {
      
      audio.play();

    }, 500);
  }
}