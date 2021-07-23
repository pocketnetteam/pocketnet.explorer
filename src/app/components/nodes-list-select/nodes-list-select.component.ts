import { Component, OnInit } from '@angular/core';
import { Globals } from 'src/app/globals';
import { DataService } from 'src/app/services/data.service';

@Component({
    selector: 'app-nodes-list2',
    templateUrl: './nodes-list-select.component.html',
    styleUrls: ['./nodes-list-select.component.less']
})
export class NodesListSelectComponent implements OnInit {

    constructor(
        private global: Globals,
        private dataService: DataService
    ) { }

    show: boolean = true;
    
    get Global() : Globals {
        return this.global;
    }

    get selectedNode(){
        return this.dataService.selectedNode;
    }

    get nodes(){
        return this.dataService.nodes;

    }

    toggleShow(){
        this.show = !this.show;
    }

    trackByFn(index, item) {    
        return item.node.key;
     }

     selectNode(addr){
        this.dataService.selectNode(addr);
    }
    

    ngOnInit(){
        this.dataService.getNodes().subscribe((res: any) => {
            
            try {

                const nodes = res.data.info.nodeManager.nodes

                if (nodes){
                    this.dataService.setNodes(Object.values(nodes))
                }


            } catch(err){

                console.log('err', err);
            }

        });
    }
}
