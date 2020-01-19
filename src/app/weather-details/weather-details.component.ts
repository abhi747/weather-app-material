import { Component, OnInit } from '@angular/core';
import { WeatherService } from './../shared/weather.service';
import { filter } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

@Component({
	selector: 'app-weather-details',
	templateUrl: './weather-details.component.html',
	styleUrls: ['./weather-details.component.scss']
})
export class WeatherDetailsComponent implements OnInit {
	currentWeather = {};
	forecastDetails = [];
	weatherDetailsFetched = false;
	constructor(private _weatherService: WeatherService) { }

	ngOnInit() {
		if (localStorage.getItem('cachedWeatherData')) {
			const cachedWeatherDataObj = JSON.parse(localStorage.getItem('cachedWeatherData'));
			this.currentWeather = cachedWeatherDataObj.currentWeather;
			this.forecastDetails = cachedWeatherDataObj.forecastDetails;
			this.weatherDetailsFetched = true;
		}
		this._weatherService.weather$.subscribe((weather: any) => {
			this.currentWeather = weather.currentWeather;
			this.forecastDetails = this.filterDates(weather.forecast);
			this.weatherDetailsFetched = true;

			localStorage.setItem('cachedWeatherData', JSON.stringify({
				currentWeather: this.currentWeather,
				forecastDetails: this.forecastDetails
			}))
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
}
