import { Pipe, PipeTransform } from '@angular/core';
import { Transaction } from 'src/app/types/Transaction';

@Pipe({
    name: 'txType'
})
export class TxTypePipe implements PipeTransform {

    private types: { [hex: number]: string } = {
        0: 'Not Supported',

        1: 'PKOIN',
        2: 'Coinbase',
        3: 'Coinstake',

        100: 'Account (User)',
        101: 'Account (Video Server)',
        102: 'Account (Message Server)',
        103: 'Account Settings',

        200: 'Post',
        201: 'Video',
        202: 'Article',
        // 203: 'Server Ping',

        204: 'Comment',
        205: 'Comment (Edit)',
        206: 'Comment (Delete)',

        207: 'Delete Content',

        208: 'Boost Content',

        300: 'Rating',
        301: 'Rating (Comment)',

        302: 'Follow',
        303: 'Follow (Private)',
        304: 'Unfollow',

        305: 'Blocking',
        306: 'Unblocking',

        307: 'Complain'
    }

    transform(tx: Transaction, args?: any): string {
        if (this.types.hasOwnProperty(tx.type)) {
            return this.types[tx.type];
        } else {
            return '';
        }
    }

    transformType(txType: string, args?: any): string {
        if (this.types.hasOwnProperty(+txType)) {
            return this.types[+txType];
        } else {
            return '';
        }
    }

}
