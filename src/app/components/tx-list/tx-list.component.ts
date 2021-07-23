import { Component, OnInit, Input, HostListener } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

import { Transaction } from 'src/app/types/Transaction';


@Component({
    selector: 'app-tx-list',
    templateUrl: './tx-list.component.html',
    styleUrls: ['./tx-list.component.less'],
    providers: [DataService],
})
export class TxListComponent implements OnInit {
    loading = false;
    txids: string[] = [];
    txs: Transaction[] = [];
    start: number = 0;
    pagesize: number = 10;

    @Input()
    set in_txids(p_txids: string[]) {
        this.txids = p_txids;
        this.loadMore();
    }

    constructor(private dataService: DataService) { }

    ngOnInit() {

    }

    loadMore() {
        if (this.loading) return;
        if (this.txs.length >= this.txids.length) return;

        this.start = this.txs.length;
        let _end = this.start + this.pagesize;
        if (_end > this.txids.length) _end = this.txids.length;
        let _txids = this.txids.slice(this.start, _end);

        this.loading = true;
        this.dataService.getTransactions(_txids).subscribe(data => {
            let _txs: Transaction[] = data['data']
            this.txs.push.apply(this.txs, _txs);
            this.loading = false;
        });
    }

    @HostListener("window:scroll", [])
    onScroll(): void {
        if ((window.innerHeight + window.scrollY) >= (document.body.scrollHeight - 150)) {
            this.loadMore();
        }
    }

}
