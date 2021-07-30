import { Pipe, PipeTransform } from '@angular/core';
import { BlockCompact } from 'src/app/types/Block';
import { Types } from 'src/app/types/Transaction';

@Pipe({
    name: 'SubscribesCnt'
})
export class SubscribesCntPipe implements PipeTransform {

    transform(block: BlockCompact, args?: any): number {
        return (block.types[Types.Subscribe]||0 + block.types[Types.SubscribePrivate]||0) || 0;
    }

}
