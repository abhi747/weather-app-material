import { Component, OnInit, ViewChild } from '@angular/core';
import { WeatherService } from './../shared/services/weather.service';
import { forkJoin } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
	selector: 'app-weather-search',
	templateUrl: './weather-search.component.html',
	styleUrls: ['./weather-search.component.scss']
})
export class WeatherSearchComponent {
	currentWeather$;
	forecast$;
	@ViewChild('weatherForm', { static: true }) weatherForm;
	constructor(
		private _weatherService: WeatherService,
		private _snackBar: MatSnackBar,
		private _router: Router
	) {
		this.getLocationCord();
	}

	getLocationCord() {
		if (navigator) {
			this._weatherService.setLoader(true);
			navigator.geolocation.getCurrentPosition((pos: any) => {
				const lat = pos.coords.latitude;
				const long = pos.coords.longitude;
				this.currentWeather$ = this._weatherService.getWeatherByCord(lat, long);
				this.forecast$ = this._weatherService.getWeatherForeCastByCord(lat, long);
				forkJoin([this.currentWeather$, this.forecast$]).subscribe((data) => {
					this._weatherService.setLoader(false);
					this._weatherService.setWeather({ currentWeather: data[0], forecast: data[1] });
				}, _ =>
					this._weatherService.setLoader(false)
				)
			}, _ => this._weatherService.setLoader(false));

		}
	}

	searchWeather(city: string) {
		if (this._router.url !== "/home") {
			this._router.navigate(["/home"]).then((navigated) => {
				if (navigated) {
					this._weatherService.setLoader(true);
					this.currentWeather$ = this._weatherService.getWeatherByCityName(city);
					this.forecast$ = this._weatherService.getWeatherForeCastByCityName(city);
					this.getWeatherDetails();
				}
			});
		} else {
			this._weatherService.setLoader(true);
			this.currentWeather$ = this._weatherService.getWeatherByCityName(city);
			this.forecast$ = this._weatherService.getWeatherForeCastByCityName(city);
			this.getWeatherDetails();
		}
	}
	getWeatherDetails() {
		forkJoin([this.currentWeather$, this.forecast$]).subscribe((data) => {
			this._weatherService.setLoader(false);
			this._weatherService.setWeather({ currentWeather: data[0], forecast: data[1] });
		}, _ => {
			this._weatherService.setLoader(false);
			this.openSnackBar();
		})
	}
	openSnackBar() {
		this._snackBar.open('City/ Town not found', 'Okay', {
			duration: 3000,
			verticalPosition: 'top',
		});
	}
}
