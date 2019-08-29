import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'round'
})
export class RoundPipe implements PipeTransform {

    private round(number, precision): number {
        var factor = Math.pow(10, precision);
        var tempNumber = number * factor;
        var roundedTempNumber = Math.round(tempNumber);
        return roundedTempNumber / factor;
    };

    transform(value: number, precision: number = 2): number {
        return this.round(value, precision);
    }

}
