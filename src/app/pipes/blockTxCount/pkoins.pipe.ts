import { Pipe, PipeTransform } from '@angular/core';
import { BlockCompact } from 'src/app/types/Block';
import { Types } from 'src/app/types/Transaction';

@Pipe({
    name: 'PkoinsCnt'
})
export class PkoinsCntPipe implements PipeTransform {

    transform(block: BlockCompact, args?: any): number {
        return ((block.types[Types.Money]||0) + (block.types[Types.Coinbase]||0) + (block.types[Types.Coinstake]||0)) || 0;
    }

}
