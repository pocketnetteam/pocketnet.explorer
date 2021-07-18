import { Component, OnInit } from '@angular/core';
import { Globals } from 'src/app/globals';
import { ToastrService } from 'ngx-toastr';

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
    constructor(
        private global: Globals,
        private toastr: ToastrService
    ) {}

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

    showError(err) {
        this.toastr.error(err);
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

    removeProxy(idx) {

        idx -= this.defaultProxies.length
        console.log('remvoeProxy', idx);
        this.addedProxies.splice(idx, 1);
        localStorage.setItem('listofproxies', JSON.stringify(this.addedProxies));
    }

    setProxy(idx){

        idx -= this.defaultProxies.length
    }

    addProxyItem(){

        console.log('item',  this.host, this.port, this.wss);

        const newProxy = {
            host: this.host,
            port: this.port,
            wss: this.wss
        };

        if (this.addedProxies.find(proxy => JSON.stringify(proxy) === JSON.stringify(newProxy))){

            this.showError('You already have this proxy in list.');

        } else {

            this.addedProxies.push({
                host: this.host,
                port: this.port,
                wss: this.wss
            })
    
            localStorage.setItem('listofproxies', JSON.stringify(this.addedProxies))
    
            this.host = '';
            this.port = '8899';
            this.wss = '8099';
    
            this.closeModalAdd();
        }


    }

    trackByFn(index, item) {    
        return item.address + ':' + item.port; 
     }
    
    ngOnInit() {
        const listofproxies = localStorage.getItem('listofproxies');

        if (listofproxies){
            this.addedProxies = JSON.parse(listofproxies);
        }
    }

}
