import { Pipe, PipeTransform } from '@angular/core';
import { BlockCompact } from 'src/app/types/Block';
import { Types } from 'src/app/types/Transaction';

@Pipe({
    name: 'BarteronOfferCnt'
})
export class BarteronOfferCntPipe implements PipeTransform {

    transform(block: BlockCompact, args?: any): number {
        return (block.types[Types.BarteronOffer]||0) || 0;
    }

}
