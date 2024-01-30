import { ElementRef, Injectable, signal } from '@angular/core';
import videojs from 'video.js';
import Player from 'video.js/dist/types/player';

@Injectable({
	providedIn: 'root',
})
export class ControllerService {
	private readonly currentTime = signal<number>(0);
	private lastReportedTime: number = -1;
	private player: Player | undefined;

	initPlayer(videoPlayer: ElementRef | undefined) {
		this.player = videojs(
			videoPlayer?.nativeElement,
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
						src: 'https://player.vimeo.com/play/751fe671-626c-48e1-95ce-c851204392c0/hls.m3u8?s=895053292_1706727547_a5b19362a2c86f3d00e49cb50e19b7e3&context=Vimeo%5CController%5CApi%5CResources%5CVideoController.&oauth2_token_id=1749201174',
					},
				],
			},
			() => this.afterPlayerInit()
		);
	}

	tearDownPlayer() {
		this.player?.off('timeupdate');
		this.player?.dispose();
		this.player = undefined;
	}

	private afterPlayerInit() {
		this.player?.on('timeupdate', () => {
			this.onTimeUpdated();
		});
	}

	private onTimeUpdated() {
		if (!this.player) {
			return;
		}

		this.currentTime.set(this.player.currentTime() || 0);
		const currentTime = this.currentTime();

		if (
			(this.player.paused() && this.lastReportedTime !== currentTime) ||
			Math.abs(currentTime - this.lastReportedTime) > 0.5
		) {
			this.sendProgressMarker(currentTime);
		}
	}

	private sendProgressMarker(time: number, forceProgress = false) {
		const roundedPosition = Math.floor(time < 1 ? 1.0 : time);
		const haveNotReportedYet = this.lastReportedTime == 0;
		const hasBeen20Seconds = Math.abs(roundedPosition - this.lastReportedTime) >= 20;
		const shouldSend = forceProgress || haveNotReportedYet || hasBeen20Seconds;

		if (shouldSend) {
			this.lastReportedTime = roundedPosition;
			console.debug('sendProgressMarker', roundedPosition);
		}
	}
}
