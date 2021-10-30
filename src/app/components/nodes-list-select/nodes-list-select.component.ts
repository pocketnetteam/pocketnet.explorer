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

    show: boolean = false;
    
    get Global() : Globals {
        return this.global;
    }

    get fixed(){

        return this.dataService.fixed;
    }

    get selectedNode(){
        return this.dataService.selectedNode;
    }

    get nodes(){
        return this.dataService.nodes;

    }


    fix(boo: boolean){

        this.dataService.fix(boo);
    }

    toggleShow(){
        this.show = !this.show;
    }

    trackByFn(index, item) {    
        return item.node.key;
     }

     selectNode(addr){
        this.fix(false);
        this.dataService.selectNode(addr);
        location.reload();
    }
    

    ngOnInit(){
        this.dataService.getNodes().subscribe((res: any) => {
            
            try {

                const nodes = res.data.info.nodeManager.nodes

                if (nodes){
                    this.dataService.setNodes(Object.values(nodes))
                }

                const node: any = this.selectedNode && nodes[this.selectedNode];

                const availableNode = node && node.node && node.statistic && node.statistic.percent && !node.statistic.difference;

                if (!this.fixed && !availableNode){

                    this.dataService.checkProxy().subscribe((resP: any) => {

                        let node = resP && resP.data && resP.data.node;
    
                        if (!node && nodes){
    
                            const keys = Object.keys(nodes); 
    
                            if (keys.length && keys.indexOf(this.dataService.defaultNode) === -1){
                                node = keys[0];
                            } else {
                                node = this.dataService.defaultNode;
                            }
    
                        } 
    
                        this.selectNode(node);

    
                    })
                }




            } catch(err){

                console.log('err', err);
            }

        });
    }
}
