export class MidiButtonData {

    audio: HTMLAudioElement
    active: boolean = false
    color: string

    public constructor(color: string, audio: HTMLAudioElement) {

        this.color = color;
        this.audio = audio;
    }

    play() {

        if(this.active) {
            
            this.audio.pause();
            this.audio.currentTime = 0;
            this.audio.play();
        }
    }
}