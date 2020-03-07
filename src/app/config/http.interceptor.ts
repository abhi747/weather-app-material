import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse }
	from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { Injectable } from "@angular/core";


@Injectable()
export class WeatherHttpInterceptor implements HttpInterceptor {
	intercept(
		req: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		if (req.url.includes("openweathermap")) {
			req = this.setOpenWeatherMapAPIParams(req)
		}
		return next.handle(req);
	}
	setOpenWeatherMapAPIParams(req: HttpRequest<any>) {
		return req.clone({
			setParams: {
				APPID: environment.OpenWeatherMapAPIKEY,
				units: 'metric'
			}
		});
	}
}