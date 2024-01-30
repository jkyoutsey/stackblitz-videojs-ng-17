import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import videojs from 'video.js';
import Player from 'video.js/dist/types/player';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
})
export class VideoPlayerComponent implements AfterViewInit {
  @ViewChild('target', { static: true }) videoPlayer!: ElementRef;

  options = {
    autoplay: false,
    playbackRates: [0.5, 1, 1.5, 2],
  };

  player!: Player;
  qualityLevels: any;

  ngAfterViewInit(): void {
    this.readyVideojsPlayer();
  }

  readyVideojsPlayer() {
    this.player = videojs(
      this.videoPlayer?.nativeElement,
      {
        preload: 'auto',
        controls: true,
        fluid: true,
        autoplay: false,
        playbackRates: [0.5, 1, 1.5, 2],
        controlBar: {
          subsCapsButton: false,
        },
        sources: [
          {
            src: 'https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.m3u8',
          },
        ],
      },
      () => {}
    );
  }

  ngOnDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  }
}
