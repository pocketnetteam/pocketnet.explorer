import { Pipe, PipeTransform } from '@angular/core';
import { BlockCompact } from 'src/app/types/Block';
import { Types } from 'src/app/types/Transaction';

@Pipe({
    name: 'AccountsCnt'
})
export class AccountsCntPipe implements PipeTransform {

    transform(block: BlockCompact, args?: any): number {
        return ((block.types[Types.AccountUser]||0) + (block.types[Types.AccountSetting]||0)) || 0;
    }

}
