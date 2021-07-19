import { Component, OnInit } from '@angular/core';
import { Globals } from 'src/app/globals';
import { ToastrService } from 'ngx-toastr';

type Proxy = {
    host: string,
    port: string,
    wss: string, 
    default?: boolean, 
    selected?: boolean,
    key?: string
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
    txtSuccessSave: string = 'Save';

    value: string = 'https://pocketnet.app:8899';
    displayModalSelect: boolean = false;
    defaultProxies: Proxy[] = [
        {
            host: 'https://pocketnet.app', 
            port: '8899',
            wss: '8099',
            key: 'https://pocketnet.app:8899:8099',
            default: true
        }, 
        {
            host: 'https://1.pocketnet.app', 
            port: '8899',
            wss: '8099',
            key: 'https://1.pocketnet.app:8899:8099',
            default: true
        }
    ];

    addedProxies: Proxy[] = [];
    selectedUse = 'https://pocketnet.app:8899';
    selectedWatch: string = 'https://pocketnet.app:8899';
    selectedType = 'selectedUse';

    displayModalAdd: boolean = false;

    newProxy: Proxy = {
        host: '',
        port: '8899',
        wss: '8099'
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

    openModalAdd(){

        this.displayModalSelect = false;
        this.displayModalAdd = true;


    }

    removeProxy(idx) {

        idx -= this.defaultProxies.length
        console.log('remvoeProxy', idx);
        this.addedProxies.splice(idx, 1);
        localStorage.setItem('listofproxies_explorer', JSON.stringify(this.addedProxies));
    }

    setProxy(idx){

        idx -= this.defaultProxies.length;

        if (idx > -1){

            this.newProxy = this.addedProxies[idx]

            this.openModalAdd();

        } else {

            console.log('This proxy doesnt exsist');
        }



    }

    addProxyItem(){

        const key = this.createKey(this.newProxy);


        if (this.addedProxies.find(proxy => proxy.key === key && proxy.key !== this.newProxy.key)){

            this.showError('You already have this proxy in list.');

        } else {

            if (this.newProxy.key){

                const idx = this.addedProxies.findIndex(proxy => proxy.key === this.newProxy.key);

                if (idx > -1){

                    this.addedProxies.splice(idx, 1, {...this.newProxy, key});

                } else {

                    this.addedProxies.push({...this.newProxy, key});
                }

            } else {

                this.newProxy.key = key;

                this.addedProxies.push(this.newProxy)
                        
            }

            localStorage.setItem('listofproxies_explorer', JSON.stringify(this.addedProxies))

            this.newProxy = {
                host: '',
                port: '8899',
                wss: '8099'
            }
    
            this.closeModalAdd();
        }


    }

    createKey(proxy){

        return proxy.host + ':' + proxy.port + ':' + proxy.wss;
    }

    trackByFn(index, item) {    
        return item.key;
     }
    
    ngOnInit() {
        const listofproxies_explorer = localStorage.getItem('listofproxies_explorer');

        if (listofproxies_explorer){
            this.addedProxies = JSON.parse(listofproxies_explorer);
        }
    }

}
