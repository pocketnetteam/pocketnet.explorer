import { Pipe, PipeTransform } from '@angular/core';
import { Transaction } from 'src/app/types/Transaction';

@Pipe({
    name: 'txFee'
})
export class TxFeePipe implements PipeTransform {

    transform(tx: Transaction): number {
        let fee = 0;
        
        tx.vin.forEach((i) => {
            fee += i.value;
        });

        tx.vout.forEach((o) => {
            fee -= o.value;
        });
        
        return fee/100000000;
    }

}
