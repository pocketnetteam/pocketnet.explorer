import { Component, OnInit } from '@angular/core';
import { Globals } from 'src/app/globals';
import { DataService } from 'src/app/services/data.service';
import * as semver from 'semver';

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

    get fixed(){
        return this.dataService.fixed;
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
        this.dataService.fix(false);
        this.dataService.selectNode(addr);
        location.reload();
    }
    

    ngOnInit(){
        this.dataService.getNodes((res: any) => {
            try {

                // debugger;

                const nodes = {};
                
                for (var n in res.info.nodeManager.nodes)
                {
                    let node = res.info.nodeManager.nodes[n];
                    if (node.node.version && semver.gte(node.node.version, '0.20.25'))
                        if (node.status.difference > -10)
                            nodes[node.node.key] = node;
                }

                if (nodes){
                    this.dataService.setNodes(Object.values(nodes))
                }

                // debugger;

                let node = this.selectedNode && nodes[this.selectedNode];
                if (!node && Object.keys(nodes).length > 0)
                {
                    node = nodes[Object.keys(nodes)[0]]
                    this.dataService.fix(false);
                    this.dataService.selectNode(node.node.key);
                }

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
