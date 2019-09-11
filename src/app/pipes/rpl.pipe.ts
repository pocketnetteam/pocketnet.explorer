import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'rpl'
})
export class RplPipe implements PipeTransform {

    transform(value: string, from: string, to: string): string {
        return value.replace(from, to);
    }

}
