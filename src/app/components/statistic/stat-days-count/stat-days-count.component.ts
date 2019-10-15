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
        let cur_date: Date = new Date();
        let end_time: Number = Math.floor(+cur_date / 1000);

        cur_date.setMonth(cur_date.getMonth() - this.statPeriod)
        let beg_time: Number = Math.floor(+cur_date / 1000);


        this.dataService.getStatistic(end_time, beg_time).subscribe(data => {
            this.statisticData = data['data']['result'];
            this.fillChartUsers(this.statisticData);
            this.fillChartEvents(this.statisticData);
        });
    }

    fillChartUsers(data) {
        let _datasets = {};
        let categories = [];

        for (let x in data) {
            let _x = data[x];
            categories.push(new Date(+x * 1000));

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
                    format: '{value:%e %b}',
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
                crosshairs: true,
                // formatter: function() {
                //     return  `<b>${ this.series.name }</b> ${ Highcharts.dateFormat('%b %e, %Y', this.x) }<br/><b>${ this.y }</b> tx(s)`;
                // },
                formatter: function () {
                    var points = this.points;
                    var pointsLength = points.length;
                    var tooltipMarkup = pointsLength ? `<span style="font-size: 12px"><b>${ Highcharts.dateFormat('%b %e, %Y', points[0].key) }</b></span><br/>` : ``;
                    var index;

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

        for (let x in data) {
            let _x = data[x];
            categories.push(new Date(+x * 1000));

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
                    format: '{value:%e %b}',
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
                crosshairs: true,
                // formatter: function() {
                //     return  `<b>${ this.series.name }</b> ${ Highcharts.dateFormat('%b %e, %Y', this.x) }<br/><b>${ this.y }</b> tx(s)`;
                // },
                formatter: function () {
                    var points = this.points;
                    var pointsLength = points.length;
                    var tooltipMarkup = pointsLength ? `<span style="font-size: 12px"><b>${ Highcharts.dateFormat('%b %e, %Y', points[0].key) }</b></span><br/>` : ``;
                    var index;

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
