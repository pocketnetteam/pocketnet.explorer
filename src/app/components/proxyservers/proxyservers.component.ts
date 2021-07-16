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

    txtSuccess: string = 'Add proxy';

    value: string = 'https://pocketnet.app:8899';
    displayModal: boolean = false;
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

    openModal(type: string){

        this.selectedType = type
        this.displayModal = true;
    }

    closeModal(){
        this.displayModal = false;
    }

    
    ngOnInit() {
    }

}
