import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { DataService } from 'src/app/services/data.service';
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
        private global: Globals) { }

    get Global() : Globals {
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

        this.dataService.getStatistic(endTime, this.statPeriod, data => {
            this.statisticData = data;
            this.fillChartUsers(this.statisticData.users);
            this.fillChartEvents(this.statisticData.txs);

            setTimeout(() => {
                this.loadData();
            }, this.global.updateInterval);
        });
    }

    formatTooltip() {
        if ([1].indexOf(this.statPeriod) >= 0)
            return '%b %e, %Y %H:00';

        if ([2,3,4,5].indexOf(this.statPeriod) >= 0)
            return '%b %e, %Y';
    }

    formatLabel() {
        if ([1].indexOf(this.statPeriod) >= 0)
            return '%H:00';

        if ([2].indexOf(this.statPeriod) >= 0)
            return '%b %e, %Y';

        if ([2,3,4,5].indexOf(this.statPeriod) >= 0)
            return '%b %e';
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
                    let _caption = y;

                    // TODO (brangr): implement caption by type

                    _datasets[y] = {
                        name: _caption,
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
                type: 'spline'
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
                    let tooltipMarkup = pointsLength ? `<span style="font-size: 12px"><b>${ points[0].key }</b></span><br/>` : ``;
                    let index;

                    for (index = 0; index < pointsLength; index += 1) {
                        tooltipMarkup += `<span style="color:${ points[index].color }">\u25CF</span> ${ points[index].series.name }: <b>${ points[index].y }</b><br/>`;
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

    private legendIndexes = {
        'Users': 1,
        'Subscribes': 2,
        'Posts': 3,
        'Ratings': 4,
        'Comments': 5,
        'CommentRatings': 6
    }

    fillChartEvents(data) {
        let _datasets = {};
        let categories = [];
        let self = this;

        for (let x in data) {
            if (Object.keys(data)[Object.keys(data).length - 1] == x)
                break;

            categories.push(x);

            for (let y in data[x]) {
                if (y == '3') continue;

                if (!(y in _datasets)) {
                    let _caption = y;
                    if (_caption == 'UsersAcc') continue;
                    if (_caption == 'Users') _caption = 'New users';
                    if (_caption == 'Subscribes') _caption = 'Follows';
                    if (_caption == 'CommentRatings') _caption = 'Comments Ratings';
                    if (_caption == 'Ratings') _caption = 'Posts Ratings';

                    _datasets[y] = {
                        name: _caption,
                        data: [],
                        legendIndex: this.legendIndexes[y]
                    };
                }

                _datasets[y].data.push(data[x][y]);
            }
        }

        let datasets = [];
        for (let d in _datasets) {
            datasets.push(_datasets[d]);
        }

        Highcharts.chart('stat_days_count_canvas', {
            title: {
                text: ''
            },
            chart: {
                type: 'spline'
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
                    let tooltipMarkup = pointsLength ? `<span style="font-size: 12px"><b>${ points[0].key }</b></span><br/>` : ``;
                    let index;

                    for (index = 0; index < pointsLength; index += 1) {
                        tooltipMarkup += `<span style="color:${ points[index].color }">\u25CF</span> ${ points[index].series.name }: <b>${ points[index].y }</b><br/>`;
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
