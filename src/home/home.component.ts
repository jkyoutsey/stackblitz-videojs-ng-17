import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { VideoPlayerComponent } from '../video-player/video-player.component';

@Component({
	selector: 'app-home',
	standalone: true,
	templateUrl: './home.component.html',
	imports: [CommonModule, IonicModule, VideoPlayerComponent],
})
export class HomeComponent {}
