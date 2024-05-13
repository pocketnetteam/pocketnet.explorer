import { Pipe, PipeTransform } from '@angular/core';
import { BlockCompact } from 'src/app/types/Block';
import { Types } from 'src/app/types/Transaction';

@Pipe({
    name: 'BarteronAccountCnt'
})
export class BarteronAccountCntPipe implements PipeTransform {

    transform(block: BlockCompact, args?: any): number {
        return (block.types[Types.BarteronAccount]||0) || 0;
    }

}
