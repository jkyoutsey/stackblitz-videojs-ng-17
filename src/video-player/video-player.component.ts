import { AfterViewInit, Component, ElementRef, ViewChild, ViewEncapsulation, inject } from '@angular/core';
import { ControllerService } from '../controller/controller.service';

@Component({
	selector: 'app-video-player',
	templateUrl: './video-player.component.html',
	styleUrls: ['./video-player.component.scss'],
	encapsulation: ViewEncapsulation.None,
	standalone: true,
})
export class VideoPlayerComponent implements AfterViewInit {
	@ViewChild('target', { static: true }) videoPlayer!: ElementRef;

	private controller = inject(ControllerService);

	ngAfterViewInit(): void {
		this.controller.initPlayer(this.videoPlayer);
	}

	ngOnDestroy() {
		this.controller.tearDownPlayer();
	}
}
