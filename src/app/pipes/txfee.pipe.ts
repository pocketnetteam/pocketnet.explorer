import { Pipe, PipeTransform } from '@angular/core';
import { Transaction } from 'src/app/types/Transaction';

@Pipe({
    name: 'txFee'
})
export class TxFeePipe implements PipeTransform {

    transform(tx: Transaction): number {
        // TODO (brangr): implement
        // .fee/100000000
        // sum(inp)-sum(out)
        return 0;
    }

}
