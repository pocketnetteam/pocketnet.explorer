import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { DataService } from 'src/app/services/data.service';

Highcharts.setOptions({
    title: {
        style: {
            color: 'tomato'
        }
    },
    legend: {
        enabled: false
    }
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

    constructor(private dataService: DataService) { }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.getData();
    }

    getData() {
        this.dataService.getStatistic().subscribe(data => {
            this.statisticData = data['data']['result'];
            this.fillChart(this.statisticData);
        });
    }

    fillChart(data) {
        let _datasets = {};
        let _labels = [];

        for (let x in data) {
            let _x = data[x];
            _labels.push(x);

            for (let y in _x) {
                // Create lines
                if (!(y in _datasets)) {
                    let _caption = y;
                    if (_caption == 'Users') _caption = 'New users';
                    if (_caption == 'Subscribes') _caption = 'Follows';

                    _datasets[y] = {
                        name: _caption,
                        data: []
                    };
                }

                _datasets[y].data.push({
                    x: new Date(+x * 1000),
                    y: _x[y]
                });
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
                type: 'logarithmic',
                title: {
                    text: ''
                }
            },
            xAxis: {
                type: 'datetime',
                labels: {
                    format: '{value:%e. %b}',
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
                formatter: function() {
                    return  `<b>${ this.series.name }</b> ${ Highcharts.dateFormat('%b %e, %Y', this.x) }<br/><b>${ this.y }</b> tx(s)`;
                },
            },
            plotOptions: {
                spline: {
                    marker: {
                        enabled: false
                    }
                },
                series: {
                    connectNulls: true,
                    label: {
                        connectorAllowed: true
                    },
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
