import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DatePipe } from '@angular/common'

import { DataService } from 'src/app/services/data.service';
import { TxTypePipe } from 'src/app/pipes/txType.pipe';
import { Globals } from 'src/app/globals';
import { stringify } from 'querystring';

@Component({
    selector: 'app-stat-emission',
    templateUrl: './stat-emission.component.html',
    styleUrls: ['./stat-emission.component.less']
})
export class StatEmissionComponent implements OnInit, AfterViewInit {

    coinInfo: any = {
        emission: 12129115,
        height: 1750823,
        emissionPercent: 34
    };
    show: boolean = true;
    loading: boolean = false;

    constructor(
        private dataService: DataService,
        private global: Globals,
        private txTypePipe: TxTypePipe,
        public datepipe: DatePipe) { }

    get Global(): Globals {
        return this.global;
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.loadData();
    }

    toggleShow() {
        this.show = !this.show;
    }

    loadData() {
        if (this.loading) return;
        this.loading = true;

        this.dataService.getCoinInfo(
            data => {
                this.loading = false;
                
                this.coinInfo = data;
                this.coinInfo.emissionPercent = this.coinInfo.emission / 240000;
                this.fillChartCoin();

                setTimeout(() => {
                    this.loadData();
                }, this.global.updateInterval);
            },
            err => {
                this.coinInfo = {
                    emission: 12129115,
                    height: 1750823,
                    emissionPercent: 12129115 / 240000
                };
                this.fillChartCoin();

                setTimeout(() => {
                    this.loadData();
                }, this.global.updateInterval);
            }
        );
    }

    fillChartCoin() {
        let self = this;


    }

}
