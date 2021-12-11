import { Component, OnInit } from '@angular/core';
import { Globals } from 'src/app/globals';

@Component({
    selector: 'app-nodes-list',
    templateUrl: './nodes-list.component.html',
    styleUrls: ['./nodes-list.component.less']
})
export class NodesListComponent implements OnInit {

    constructor(
        private global: Globals
    ) { }

    show: boolean = true;

    get Global() : Globals {
        return this.global;
    }

    toggleShow(){
        this.show = !this.show;
    }

    ngOnInit(){}

}
