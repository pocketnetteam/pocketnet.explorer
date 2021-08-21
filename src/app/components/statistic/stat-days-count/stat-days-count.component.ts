import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { DataService } from 'src/app/services/data.service';
import { TxTypePipe } from 'src/app/pipes/txType.pipe';
import { Globals } from 'src/app/globals';
import { stringify } from 'querystring';

Highcharts.setOptions({
});

@Component({
    selector: 'app-stat-days-count',
    templateUrl: './stat-days-count.component.html',
    styleUrls: ['./stat-days-count.component.less']
})
export class StatDaysCountComponent implements OnInit, AfterViewInit {

    canvas: any;
    ctx: any;
    statisticData: any;
    statPeriod: any = 2;
    show: boolean = true;

    constructor(private dataService: DataService,
        private global: Globals,
        private txTypePipe: TxTypePipe) { }

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
        let endTime = this.Global.blockchainInfo.lastblock.time;

        this.dataService.getStatistic(endTime, this.statPeriod,
            data => {
                this.statisticData = data;
                this.fillChartUsers(this.statisticData.users);
                this.fillChartEvents(this.statisticData.txs);

                setTimeout(() => {
                    this.loadData();
                }, this.global.updateInterval);
            },
            err => {
                setTimeout(() => {
                    this.loadData();
                }, this.global.updateInterval);
            }
        );
    }

    formatTooltip(value: string) {
        if (this.statPeriod == 1)
            return `${value.substr(6, 2)}/${value.substr(4, 2)}/${value.substr(0, 4)} ${value.substr(8, 2)}:00`;

        if (this.statPeriod == 2)
            return `${value.substr(6, 2)}/${value.substr(4, 2)}/${value.substr(0, 4)}`;

        if (this.statPeriod == 3)
            return `${value.substr(4, 2)}/${value.substr(0, 4)}`;
    }

    fillChartUsers(data) {
        let _datasets = {};
        let categories = [];
        let self = this;

        for (let x in data) {
            if (Object.keys(data)[Object.keys(data).length - 1] == x)
                break;

            categories.push(x);

            for (let y in data[x]) {
                if (!(y in _datasets)) {
                    _datasets[y] = {
                        name: this.txTypePipe.transformType(y),
                        data: []
                    };
                }

                _datasets[y].data.push(data[x][y]);
            }
        }

        let datasets = [];
        for (let d in _datasets) {
            datasets.push(_datasets[d]);
        }

        Highcharts.chart('stat_days_users_canvas', {
            title: {
                text: ''
            },
            chart: {
                type: 'area'
            },
            yAxis: {
                title: {
                    text: ''
                }
            },
            xAxis: {
                categories: categories,
                type: 'datetime',
                labels: {
                    formatter: function () { return String(this.value); },
                    style: {
                        fontSize: '0.6rem'
                    }
                },
            },
            legend: {
                enabled: true,
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom'
            },
            tooltip: {
                shared: true,
                //crosshairs: true,
                formatter: function () {
                    let points = this.points;
                    let pointsLength = points.length;
                    let tooltipMarkup = pointsLength ? `<b><span style="font-size: 13px">${self.formatTooltip(points[0].key + '')}</span></b><br/>` : ``;
                    let index;

                    for (index = 0; index < pointsLength; index += 1) {
                        tooltipMarkup += `<span style="color:${points[index].color}">\u25CF</span> ${points[index].series.name}: <b><span style="font-size: 13px">${points[index].y}</span></b><br/>`;
                    }

                    return tooltipMarkup;
                }
            },
            plotOptions: {
                spline: {
                    marker: {
                        enabled: false
                    }
                },
                series: {
                    connectNulls: true,
                    animation: false
                }
            },
            series: datasets,
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            }
        });
    }

    fillChartEvents(data) {
        let _datasets = {};
        let categories = [];
        let self = this;
        let yAxisCounter = {};

        for (let x in data) {
            if (Object.keys(data)[Object.keys(data).length - 1] == x)
                break;

            categories.push(x);

            for (let y in data[x]) {
                if (y == '3') continue;

                if (!(y in yAxisCounter))
                    yAxisCounter[y] = Object.keys(yAxisCounter).length;

                if (!(y in _datasets)) {
                    _datasets[y] = {
                        name: this.txTypePipe.transformType(y),
                        data: [],
                        legendIndex: y,
                        yAxis: yAxisCounter[y]
                    };
                }

                _datasets[y].data.push(data[x][y]);
            }
        }

        let yAxis = [];
        let datasets = [];
        for (let d in _datasets) {
            datasets.push(_datasets[d]);
            yAxis.push({
                title: {
                    text: d
                },
                visible: false,
                opposite: true
            });
        }

        Highcharts.chart('stat_days_count_canvas', {
            title: {
                text: ''
            },
            chart: {
                type: 'spline'
            },
            yAxis: yAxis,
            xAxis: {
                categories: categories,
                labels: {
                    formatter: function () { return self.formatTooltip(String(this.value)); },
                    style: {
                        fontSize: '0.6rem'
                    }
                },
            },
            legend: {
                enabled: true,
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom'
            },
            tooltip: {
                shared: true,
                //crosshairs: true,
                formatter: function () {
                    // let tooltipMarkup = `<b><span style="font-size: 13px;">${self.formatTooltip(this.key + '')}</span></b><br/>`;
                    // tooltipMarkup += `<span style="color:${this.color}">\u25CF</span> ${this.series.name}: <b><span style="font-size: 12px;">${this.y}</span></b><br/>`;
                    // return tooltipMarkup;

                    let points = this.points;
                    let pointsLength = points.length;
                    let tooltipMarkup = pointsLength ? `<b><span style="font-size: 13px;">${self.formatTooltip(points[0].key + '')}</span></b><br/>` : ``;
                    let index;

                    for (index = 0; index < pointsLength; index += 1) {
                        tooltipMarkup += `<span style="color:${points[index].color}">\u25CF</span> ${points[index].series.name}: <b><span style="font-size: 12px;">${points[index].y}</span></b><br/>`;
                    }

                    return tooltipMarkup;
                }
            },
            plotOptions: {
                spline: {
                    marker: {
                        enabled: false
                    }
                },
                series: {
                    connectNulls: true,
                    animation: false
                }
            },
            series: datasets,
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            }
        });
    }

}
