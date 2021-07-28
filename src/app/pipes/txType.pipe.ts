import { Pipe, PipeTransform } from '@angular/core';
import { Transaction } from 'src/app/types/Transaction';

@Pipe({
    name: 'txType'
})
export class TxTypePipe implements PipeTransform {

    private types: { [hex: string]: string } = {
        '7570766f74655368617265': 'Score to Post',
        '636f6d706c61696e5368617265': 'Complain',
        '7368617265': 'Post',
        '736861726565646974': 'Post Edit',
        '737562736372696265': 'Subscribe',
        '73756273637269626550726976617465': 'Subscribe Private',
        '756e737562736372696265': 'Unsubscribe',
        '75736572496e666f': 'User',
        '626c6f636b696e67': 'Blocking',
        '756e626c6f636b696e67': 'Unblocking',

        '636f6d6d656e74': 'Comment',
        '636f6d6d656e7445646974': 'Comment Edit',
        '636f6d6d656e7444656c657465': 'Comment Delete',
        '6353636f7265': 'Score to Comment'
    }

    transform(tx: Transaction, args?: any): string {
        // TODO (brangr): implement for new types
        
        // let asm = tx.vout[0].scriptPubKey.asm.split(' ');
        // if (asm.length < 2) {
        //     return '';
        // } else {
        //     if (this.types.hasOwnProperty(asm[1])) {
        //         return this.types[asm[1]];
        //     } else {
        //         return '';
        //     }
        // }

        return '';
    }

}
