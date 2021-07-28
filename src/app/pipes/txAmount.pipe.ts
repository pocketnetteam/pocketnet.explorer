import { Pipe, PipeTransform } from '@angular/core';
import { Transaction } from 'src/app/types/Transaction';

@Pipe({
    name: 'txAmount'
})
export class TxAmountPipe implements PipeTransform {

    transform(tx: Transaction): number {
        // TODO (brangr): implement
        // .amount/100000000
        // sum(out) ?????? как считать? по инпутам или оутпутам?
        return 0;
    }

}
