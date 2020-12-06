import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MidiComponent } from './midi/midi.component';
import { MidiButtonComponent } from './midi/button/midi-button.component';
import { MidisListComponent } from './control/midis-list/midis-list.component';
import { PlayControlComponent } from './control/play-control/play-control.component';
import { MidisDataControlComponent } from './control/midis-data-control/midis-data-control.component';

@NgModule({
    declarations: [
        AppComponent,
        MidiComponent,
        MidiButtonComponent,
        MidisListComponent,
        PlayControlComponent,
        MidisDataControlComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatIconModule,
        MatGridListModule,
        MatCardModule,
        MatListModule,
        MatButtonToggleModule,
        MatInputModule,
        MatFormFieldModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
