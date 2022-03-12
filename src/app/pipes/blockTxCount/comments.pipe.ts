import { Pipe, PipeTransform } from '@angular/core';
import { BlockCompact } from 'src/app/types/Block';
import { Types } from 'src/app/types/Transaction';

@Pipe({
    name: 'CommentsCnt'
})
export class CommentsCntPipe implements PipeTransform {

    transform(block: BlockCompact, args?: any): number {
        return ((block.types[Types.Comment]||0) + (block.types[Types.CommentDelete]||0) + (block.types[Types.CommentEdit]||0)) || 0;
    }

}
