import { Component, OnInit, OnDestroy } from '@angular/core';
import { WeatherService } from './../shared/weather.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-weather-details',
	templateUrl: './weather-details.component.html',
	styleUrls: ['./weather-details.component.scss']
})
export class WeatherDetailsComponent implements OnInit, OnDestroy {
	currentWeather = {};
	forecastDetails = [];
	isLoader = false;
	weatherSubscription: Subscription;
	loaderSubscription: Subscription;
	constructor(private _weatherService: WeatherService) { }

	ngOnInit() {
		if (localStorage.getItem('cachedWeatherData')) {
			const cachedWeatherDataObj = JSON.parse(localStorage.getItem('cachedWeatherData'));
			this.currentWeather = cachedWeatherDataObj.currentWeather;
			this.forecastDetails = cachedWeatherDataObj.forecastDetails;
			this.isLoader = false;
		}
		this.weatherSubscription = this._weatherService.weather$.subscribe((weather: any) => {
			this.currentWeather = weather.currentWeather;
			this.forecastDetails = this.filterDates(weather.forecast);
			this.isLoader = false;

			localStorage.setItem('cachedWeatherData', JSON.stringify({
				currentWeather: this.currentWeather,
				forecastDetails: this.forecastDetails
			}))
		})
		this.loaderSubscription = this._weatherService.loading$.subscribe((isLoader: boolean) => {
			this.isLoader = isLoader;
		})
	}

	filterDates(forecast) {
		const forecastList = forecast.list;
		forecastList.forEach(forecastObj => {
			const date = new Date(Number(forecastObj.dt) * 1000)
			forecastObj['day'] = date.getDate();
		})
		const filteredList: any = Array.from(new Set(forecastList.map(forecast => forecast.day)))
			.map(day => {
				return forecastList.find(forecast => {
					return forecast.day === day
				})
			})
		return filteredList;
	}
	ngOnDestroy() {
		this.weatherSubscription.unsubscribe();
		this.loaderSubscription.unsubscribe();
	}
}
