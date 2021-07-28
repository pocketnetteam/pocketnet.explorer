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

    constructor(private dataService: DataService, private activateRoute: ActivatedRoute) {
        this.txhash = activateRoute.snapshot.params['hash'];
    }

    ngOnInit() {
        // this.dataService.getTransaction([this.txhash], data => {
        //     this.tx = data[0];
        // });
    }

}
