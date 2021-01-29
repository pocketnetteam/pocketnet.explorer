import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { DataService } from 'src/app/services/data.service';

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
    statPeriod: any = 1;

    constructor(private dataService: DataService) { }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.loadData();
    }

    loadData() {
        let round: Number = 3600;

        let startTime: Date = new Date();
        startTime.setHours(0, 0, 0, 0);

        let endTime: Date = new Date();
        endTime.setHours(0, 0, 0, 0);

        if (this.statPeriod == 1) {
            endTime.setHours((new Date()).getHours(), 0, 0, 0);
            startTime.setHours((new Date()).getHours() - 1, 0, 0, 0);
            startTime.setDate(startTime.getDate() - 1);
            round = 3600;
        }

        if (this.statPeriod == 2) {
            endTime.setDate((new Date()).getDate());
            startTime.setDate(startTime.getDate() - 7);
            round = 24 * 3600;
        }

        if ([3,4,5].indexOf(this.statPeriod) >= 0) {
            endTime.setHours(0, 0, 0, 0);
            startTime.setMonth(startTime.getMonth() - (this.statPeriod - 2));
            round = 24 * 3600;
        }

        console.log('startTime', startTime);
        console.log('endTime', endTime);

        // let beg_time: Number = Math.floor(+cur_date / 1000);
        this.dataService.getStatistic(Math.floor(+endTime / 1000), Math.floor(+startTime / 1000), round).subscribe(data => {
            this.statisticData = data['data']['result'];
            this.fillChartUsers(this.statisticData);
            this.fillChartEvents(this.statisticData);
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
            let _x = data[x];
            let utcDate = new Date(+x * 1000);
            utcDate.setHours(utcDate.getHours() + 1);
            utcDate.setMinutes(utcDate.getMinutes() - utcDate.getTimezoneOffset());
            categories.push(utcDate);

            for (let y in _x) {
                if (!(y in _datasets)) {
                    let _caption = y;
                    if (_caption != 'UsersAcc') continue;

                    _datasets[y] = {
                        name: _caption,
                        data: []
                    };
                }

                _datasets[y].data.push(_x[y]);
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
                    formatter: function () { return Highcharts.dateFormat(self.formatLabel(), this.value); },
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
                    let tooltipMarkup = pointsLength ? `<span style="font-size: 12px"><b>${ Highcharts.dateFormat(self.formatTooltip(), points[0].key) }</b></span><br/>` : ``;
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
                    connectNulls: true
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
            let _x = data[x];
            let utcDate = new Date(+x * 1000);
            utcDate.setHours(utcDate.getHours() + 1);
            utcDate.setMinutes(utcDate.getMinutes() - utcDate.getTimezoneOffset());
            categories.push(utcDate);

            for (let y in _x) {
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

                _datasets[y].data.push(_x[y]);
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
                    formatter: function () { return Highcharts.dateFormat(self.formatLabel(), this.value); },
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
                    let tooltipMarkup = pointsLength ? `<span style="font-size: 12px"><b>${ Highcharts.dateFormat(self.formatTooltip(), points[0].key) }</b></span><br/>` : ``;
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
                    connectNulls: true
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
