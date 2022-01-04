import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { Transaction } from 'src/app/types/Transaction';

@Component({
    selector: 'app-transaction',
    templateUrl: './transaction.component.html',
    styleUrls: ['./transaction.component.less']
})
export class TransactionComponent implements OnInit {
    txhash: string;
    tx: Transaction;
    notFound: Boolean = false;

    constructor(private dataService: DataService, private activateRoute: ActivatedRoute) {
        this.txhash = activateRoute.snapshot.params['hash'];
    }

    ngOnInit() {
        this.dataService.getTransactions([this.txhash], data => {
            if (data.length <= 0)
                this.notFound = true;
            else {
                this.tx = data[0];
                this.notFound = false;
            }
        });
    }

}
