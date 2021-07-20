import { Component, OnInit } from '@angular/core';
import { Globals } from 'src/app/globals';

@Component({
    selector: 'app-nodes-list2',
    templateUrl: './nodes-list.component.html',
    styleUrls: ['./nodes-list.component.less']
})
export class NodesListComponent2 implements OnInit {

    constructor(
        private global: Globals
    ) { }

    get Global() : Globals {
        return this.global;
    }

    ngOnInit() {

        console.log('Global.peersinfo', this.Global.peersinfo);
    }

}
