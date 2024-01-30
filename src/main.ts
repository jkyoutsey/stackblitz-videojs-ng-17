import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js';
import { VideoPlayerComponent } from './video-player/video-player.component';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <div class="video-player">
      <app-video-player></app-video-player>
    </div>
  `,
  imports: [VideoPlayerComponent]
})
export class App {
  name = 'Angular';
}

bootstrapApplication(App);
