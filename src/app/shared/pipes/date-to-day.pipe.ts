import { Pipe, PipeTransform } from '@angular/core';
import { weekDays } from '../../config/config';

@Pipe({
	name: 'dateToDay'
})
export class DateToDayPipe implements PipeTransform {

	transform(value: any, ...args: any[]): any {
		const day = (new Date(value)).getDay();
		return weekDays[day];
	}

}
