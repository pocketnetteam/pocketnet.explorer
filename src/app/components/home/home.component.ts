import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { BlockCompact } from 'src/app/types/Block';
import { Globals } from 'src/app/globals';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
    blocks: BlockCompact[];
    loading = false;
    freeze = false;
    updater: any;

    constructor(private dataService: DataService, private global: Globals) { }

    get useProxy(){
        return this.dataService.useProxy;
    }

    ngOnInit() {
        this.updateLastBlocks();
    }

    start_update() {
        this.updateLastBlocks();
    }

    stop_update() {
        clearInterval(this.updater);
    }

    updateLastBlocks(last: number = -1) {
        this.loading = true;
        this.dataService.getLastBlocks(10, last, true, data => {
            this.loading = false;
            this.blocks = data;

            this.updater = setTimeout(() => {
                this.updateLastBlocks();
            }, this.global.updateInterval);
        });
    }

    MoveBlocks(diff: number = 0) {
        this.stop_update();

        let last = -1;
        if (diff != 0) {
            last = Math.max.apply(Math, this.blocks.map(function(b) { return b.height; })) + diff;

            
            if (last >= (this.global.blockchainInfo ? this.global.blockchainInfo.lastblock.height : 0)) {
                last = this.global.blockchainInfo.lastblock.height;
                this.start_update();
            }

            if (last - 10 < 0) {
                last = 9;
            }
        } else {
            this.start_update();
        }

        this.loading = true;
        this.dataService.getLastBlocks(10, last, true, data => {
            this.loading = false;
            this.blocks = data;
        });
    }
}
