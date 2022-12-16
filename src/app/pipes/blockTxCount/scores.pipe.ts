import { Pipe, PipeTransform } from '@angular/core';
import { BlockCompact } from 'src/app/types/Block';
import { Types } from 'src/app/types/Transaction';

@Pipe({
    name: 'ScoresCnt'
})
export class ScoresCntPipe implements PipeTransform {

    transform(block: BlockCompact, args?: any): number {
        return ((block.types[Types.Score]||0) + (block.types[Types.ScoreComment]||0)) || 0;
    }

}
