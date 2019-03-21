import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Globals } from 'src/app/globals';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
    title = 'POCKETNET Explorer';
    updateBCInfo = 60000;

    constructor(private dataService: DataService, private global: Globals) {

    }

    ngOnInit() {
        if (localStorage.getItem('blockchainInfo')) {
            this.global.blockchainInfo = JSON.parse(localStorage.getItem('blockchainInfo'));
        }

        setInterval(() => {
            this.updateBlockchainInfo();
        }, this.updateBCInfo);

        this.updateBlockchainInfo();
    }

    updateBlockchainInfo() {
        this.dataService.getBlockchainInfo().subscribe(data => {
            this.global.blockchainInfo = data['data']['result'];
            localStorage.setItem('blockchainInfo', JSON.stringify(this.global.blockchainInfo));
        });
    }
}
