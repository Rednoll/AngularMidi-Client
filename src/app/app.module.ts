import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './view/app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MidiComponent } from './view/midi/midi.component';
import { MidisDataControlComponent } from './view/control/midis-data-control/midis-data-control.component';
import { MidiButtonComponent } from './view/midi/button/midi-button.component';
import { MidisListComponent } from './view/control/midis-list/midis-list.component';
import { PlayControlComponent } from './view/control/play-control/play-control.component';

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
