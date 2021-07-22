import { Component, OnInit } from '@angular/core';
import { Globals } from 'src/app/globals';
import { DataService } from 'src/app/services/data.service';

@Component({
    selector: 'app-nodes-list2',
    templateUrl: './nodes-list.component.html',
    styleUrls: ['./nodes-list.component.less']
})
export class NodesListComponent2 implements OnInit {

    constructor(
        private global: Globals,
        private dataService: DataService
    ) { }

    get Global() : Globals {
        return this.global;
    }

    get selectedNode(){
        return this.dataService.selectedNode;
    }

    selectProxyProxy(addr){
        this.dataService.selectProxyProxy(addr);
    }

    ngOnInit() {

        console.log('Global.peersinfo', this.Global.peersinfo);
    }

}
