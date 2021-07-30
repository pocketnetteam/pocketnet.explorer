import { Component, OnInit, HostListener } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Globals } from 'src/app/globals';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
    title = 'Pocketcoin (PKOIN) Explorer';

    constructor(private dataService: DataService, private global: Globals) {

    }

    ngOnInit() {
        if (localStorage.getItem('blockchainInfo')) {
            const blockchainInfo = localStorage.getItem('blockchainInfo')
            if (blockchainInfo){
                this.global.blockchainInfo = JSON.parse(blockchainInfo);

            }
        }

        if (localStorage.getItem('peersinfo')) {
            const peersinfo = localStorage.getItem('peersinfo');
            if (peersinfo){
                this.global.peersinfo = JSON.parse(peersinfo);

            }
        }

        // setInterval(() => {
        //     this.updateBlockchainInfo();
        // }, this.updateBCInfo);

        this.updateBlockchainInfo();
        this.updatePeersInfo();
    }

    updatePeersInfo() {
        this.dataService.getPeerInfo(data => {
            let peers = data;
            this.global.peersinfo = [];
            console.log('this.gloabl', this.global.peersinfo)
            peers.forEach(peer => {
                if (!this.global.peersinfo.find(function(p) { return p.addr.split(":")[0] == peer.addr.split(":")[0];}))
                    this.global.peersinfo.push(peer);
            });

            localStorage.setItem('peersinfo', JSON.stringify(this.global.peersinfo));
        });
    }


    updateBlockchainInfo() {
        this.dataService.getBlockchainInfo(data => {
            this.global.blockchainInfo = data
            localStorage.setItem('blockchainInfo', JSON.stringify(this.global.blockchainInfo));

            setTimeout(() => {
                this.updateBlockchainInfo();
            }, this.global.updateInterval);
        });
    }

    @HostListener('window:scroll', ['$event']) onScrollEvent($event) {
        // let head_fix = window.pageYOffset >= 15;
        // $('.scrolled_head').toggleClass('fixed_head', head_fix);
        // $('.body').toggleClass('fixed_head_on', head_fix);
    }
    
}

