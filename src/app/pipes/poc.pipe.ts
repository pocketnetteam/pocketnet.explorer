import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'poc'
})
export class PocPipe implements PipeTransform {

    transform(value: number, args?: any): string {
        return `${(value / 100000000).toLocaleString('en-us')} POC`;
    }

}
