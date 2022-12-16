import { Pipe, PipeTransform } from '@angular/core';
import { Transaction } from 'src/app/types/Transaction';

@Pipe({
    name: 'txAmount'
})
export class TxAmountPipe implements PipeTransform {

    transform(tx: Transaction): number {
        let amount = 0;
        
        tx.vout.forEach((o) => {
            amount += o.value;
        });
        
        return amount;
    }

}
