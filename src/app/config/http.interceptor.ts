import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse }
	from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';


export class WeatherHttpInterceptor implements HttpInterceptor {
	intercept(
		req: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		req = req.clone({
			setParams: {
				APPID: environment.APIKEY,
				units: 'metric'
			}
		});
		return next.handle(req);
	}
}