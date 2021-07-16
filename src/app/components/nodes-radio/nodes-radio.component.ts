import { Component, OnInit } from '@angular/core';
import { Globals } from 'src/app/globals';

@Component({
    selector: 'app-nodes-radio',
    templateUrl: './nodes-radio.component.html',
    styleUrls: ['./nodes-radio.component.less']
})
export class NodesRadioComponent implements OnInit {

    constructor(
        private global: Globals
    ) { }

    get Global() : Globals {
        return this.global;
    }

    ngOnInit() {
    }

}
