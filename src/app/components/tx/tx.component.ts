import { Component, OnInit, Input } from '@angular/core';
import { Transaction } from 'src/app/types/Transaction';

@Component({
    selector: 'app-tx',
    templateUrl: './tx.component.html',
    styleUrls: ['./tx.component.less']
})
export class TxComponent implements OnInit {
    @Input() tx: Transaction;
    extend: boolean = false;
    
    constructor() { }

    ngOnInit() {
    }

}
