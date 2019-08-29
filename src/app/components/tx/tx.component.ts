import { Component, OnInit, Input } from '@angular/core';
import { Transaction } from 'src/app/types/Transaction';
import { Globals } from 'src/app/globals';

@Component({
    selector: 'app-tx',
    templateUrl: './tx.component.html',
    styleUrls: ['./tx.component.less']
})
export class TxComponent implements OnInit {
    @Input() tx: Transaction;
    extend: boolean = false;
    
    constructor(private global: Globals) { }

    get Global() : Globals { return this.global; }

    ngOnInit() {
        
    }

}
