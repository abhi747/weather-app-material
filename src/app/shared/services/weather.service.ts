import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { apiUrls } from '../../config/config';
import { Subject, BehaviorSubject, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class WeatherService {
	private weatherSource = new Subject();
	weather$ = this.weatherSource.asObservable();

	private loadingSource = new BehaviorSubject(false);
	loading$ = this.loadingSource.asObservable();

	constructor(private _http: HttpClient) { }

	getWeatherByCityName<T>(city: string) {
		const url = `${environment.commonUrl}${apiUrls.currentWeather}`;
		let params = new HttpParams();
		params = params.set('q', city)
		return this._http.get<T>(url, { params });
	}
	getWeatherForeCastByCityName<T>(city: string) {
		const url = `${environment.commonUrl}${apiUrls.forecast}`;
		let params = new HttpParams();
		params = params.set('q', city)
		return this._http.get<T>(url, { params });
	}
	getWeatherByCord<T>(lat: string, lon: string): Observable<T> {
		const url = `${environment.commonUrl}${apiUrls.currentWeather}`;
		let params = new HttpParams();
		params = params.set('lat', lat);
		params = params.set('lon', lon);
		return this._http.get<T>(url, { params });
	}
	getWeatherForeCastByCord(lat: string, lon: string) {
		const url = `${environment.commonUrl}${apiUrls.forecast}`;
		let params = new HttpParams();
		params = params.set('lat', lat);
		params = params.set('lon', lon);
		return this._http.get(url, { params });
	}

	setWeather(weatherData) {
		this.weatherSource.next(weatherData)
	}
	setLoader(isLoading: boolean) {
		this.loadingSource.next(isLoading);
	}
}
