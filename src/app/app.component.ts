import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { HomeComponent } from '../home/home.component';

@Component({
	selector: 'app-root',
	standalone: true,
	template: `<ion-app><app-home></app-home></ion-app>`,
	imports: [CommonModule, IonicModule, HomeComponent],
})
export class AppComponent {}
