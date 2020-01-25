import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material/material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WeatherSearchComponent } from './weather-search/weather-search.component';
import { HeaderComponent } from './header/header.component';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { WeatherDetailsComponent } from './weather-details/weather-details.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { WeatherHttpInterceptor } from './config/http.interceptor';

@NgModule({
	declarations: [
		AppComponent,
		WeatherSearchComponent,
		HeaderComponent,
		CurrentWeatherComponent,
		WeatherDetailsComponent,
		FooterComponent,
		AboutComponent
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
