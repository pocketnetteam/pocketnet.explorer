import { Component, OnInit, Input, HostListener } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Transaction } from 'src/app/types/Transaction';
import { Globals } from 'src/app/globals';

@Component({
    selector: 'app-tx-list',
    templateUrl: './tx-list.component.html',
    styleUrls: ['./tx-list.component.less'],
    providers: [DataService],
})
export class TxListComponent implements OnInit {
    loading = false;
    completed = false;
    addressHash: string = '';
    blockHash: string = '';
    txs: Transaction[] = [];
    pageInit: number = 0;
    pageStart: number = 0;
    pageSize: number = 10;

    @Input()
    set in_addressHash(addresshash: string) {
        this.addressHash = addresshash;
        this.loadMore();
    }

    @Input()
    set in_blockHash(blockhash: string) {
        this.blockHash = blockhash;
        this.loadMore();
    }

    constructor(private dataService: DataService,
        private global: Globals
    ) {
        this.pageInit = global.blockchainInfo.lastblock.height;
    }

    ngOnInit() {

    }

    get Global() : Globals {
        return this.global;
    }

    loadMore() {
        if (this.loading) return;
        if (this.completed) return;

        this.loading = true;

        if (this.addressHash != '')
            this.loadMoreAddress();

        if (this.blockHash != '')
            this.loadMoreBlock();
    }

    fillTransactions(data: any) {
        if (data.length <= 0) {
            this.completed = true;
            this.loading = false;
            return;
        }

        let _txs: Transaction[] = data;
        _txs.sort((a,b) => (a.rowNumber > b.rowNumber) ? 0 : ((b.rowNumber > a.rowNumber) ? -1 : 0));
        this.txs.push.apply(this.txs, _txs);
        this.loading = false;
    }

    loadMoreAddress() {
        this.dataService.getAddressTransactions(this.addressHash, this.pageInit, this.txs.length, this.pageSize, data => {
            this.fillTransactions(data);
        });
    }

    loadMoreBlock() {
        this.dataService.getBlockTransactions(this.blockHash, this.txs.length, this.pageSize, data => {
            this.fillTransactions(data);
        });
    }

    @HostListener("window:scroll", [])
    onScroll(): void {
        if ((window.innerHeight + window.scrollY) >= (document.body.scrollHeight - 150)) {
            this.loadMore();
        }
    }

}
