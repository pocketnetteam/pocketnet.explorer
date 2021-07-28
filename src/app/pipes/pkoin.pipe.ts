import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'pkoin'
})
export class PKoinPipe implements PipeTransform {

    transform(value: number, minFraction: number = 0, maxFraction: number = 8): string {
        let options = { minimumFractionDigits: minFraction, maximumFractionDigits: maxFraction };
        return `${value.toLocaleString('en-us', options)} PKOIN`;
    }

}
