import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material/material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WeatherSearchComponent } from './weather-details/weather-search/weather-search.component';
import { HeaderComponent } from './header/header.component';
import { WeatherCardComponent } from './weather-details/weather-card/weather-card.component';
import { WeatherDetailsComponent } from './weather-details/weather-details.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { WeatherHttpInterceptor } from './config/http.interceptor';
import { DateToDayPipe } from './shared/pipes/date-to-day.pipe';

@NgModule({
	declarations: [
		AppComponent,
		WeatherSearchComponent,
		HeaderComponent,
		WeatherCardComponent,
		WeatherDetailsComponent,
		FooterComponent,
		AboutComponent,
		DateToDayPipe
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		MaterialModule,
		HttpClientModule,
		FormsModule,
	],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: WeatherHttpInterceptor, multi: true }
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
