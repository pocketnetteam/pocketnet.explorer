import { Component, OnInit } from '@angular/core';
import { Globals } from 'src/app/globals';

type Proxy = {
    host: string,
    port: string,
    wss: string, 
    default?: boolean, 
    selected?: boolean
};

@Component({
    selector: 'app-proxyservers',
    templateUrl: './proxyservers.component.html',
    styleUrls: ['./proxyservers.component.less']
})
export class ProxyserversComponent implements OnInit {

    txtSuccessSelect: string = 'Add proxy';
    txtSuccessAdd: string = 'Add';

    value: string = 'https://pocketnet.app:8899';
    displayModalSelect: boolean = false;
    defaultProxies: Proxy[] = [
        {
            host: 'https://pocketnet.app', 
            port: '8899',
            wss: '8099',
            default: true
        }, 
        {
            host: 'https://1.pocketnet.app', 
            port: '8899',
            wss: '8099',
            default: true
        }
    ];

    addedProxies: Proxy[] = [];
    selectedUse = 'https://pocketnet.app:8899';
    selectedWatch: string = 'https://pocketnet.app:8899';
    selectedType = 'selectedUse';

    displayModalAdd: boolean = false;

    host: string = '';
    port: string = '8899';
    wss: string = '8099';

    

    constructor(
        private global: Globals
       
    ) { 

    }

    get Global() : Globals {
        return this.global;
    }

    get proxies() : Proxy[]{

        return [
            ...this.defaultProxies, 
            ...this.addedProxies
        ].map(proxy => ({
            ...proxy, 
            selected: proxy.host + ':' + proxy.port === this[this.selectedType]
        }));

    }

    openModalSelect(type: string){

        this.selectedType = type
        this.displayModalSelect = true;
    }

    closeModalSelect(){
        this.displayModalSelect = false;
    }

    closeModalAdd(){
        this.displayModalSelect = true;
        this.displayModalAdd = false;
    }

    addProxy(){

        this.displayModalSelect = false;
        this.displayModalAdd = true;


    }

    addProxyItem(){

        console.log('item',  this.host, this.port, this.wss);

        this.addedProxies.push({
            host: this.host,
            port: this.port,
            wss: this.wss
        })

        this.host = '';
        this.port = '8899';
        this.wss = '8099';

        this.closeModalAdd();
    }
    
    ngOnInit() {
    }

}
