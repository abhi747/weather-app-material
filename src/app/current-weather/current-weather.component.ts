import { Component, OnChanges, Input } from '@angular/core';
import { weatherIcons } from '../config/config'

@Component({
	selector: 'app-current-weather',
	templateUrl: './current-weather.component.html',
	styleUrls: ['./current-weather.component.scss']
})
export class CurrentWeatherComponent implements OnChanges {
	@Input() currentWeather;
	@Input() today;
	icon;

	constructor() { }

	ngOnChanges() {
		this.setIcon();
	}
	setIcon() {
		const weatherIconObj = this.currentWeather.weather[0];
		const iconObj = weatherIcons[weatherIconObj.id];
		let iconPrefix = '';
		if (!iconObj.isNeutral) {
			if (weatherIconObj.icon.includes('d')) {
				iconPrefix = 'day';
			} else if (weatherIconObj.icon.includes('n')) {
				iconPrefix = 'night';
			}
		}
		this.icon = iconPrefix ? `${iconPrefix}-${iconObj.icon}` : iconObj.icon;
	}

}
