import { bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'zone.js';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
	providers: [
		BrowserAnimationsModule,
		// importProvidersFrom(IonicModule.forRoot({ swipeBackEnabled: false })) throws error?
	],
});
