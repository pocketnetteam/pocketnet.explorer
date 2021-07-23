import { Component, OnInit } from '@angular/core';
import { Globals } from 'src/app/globals';
import { ToastrService } from 'ngx-toastr';
import {DataService} from 'src/app/services/data.service';

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
    providers: [DataService],
    templateUrl: './proxyservers.component.html',
    styleUrls: ['./proxyservers.component.less']
})
export class ProxyserversComponent implements OnInit {
    constructor(
        private global: Globals,
        private toastr: ToastrService,
        private dataService: DataService
    ) {}

    txtSuccessSelect: string = 'Add proxy';
    txtSuccessAdd: string = 'Add';
    txtSuccessSave: string = 'Save';

    displayModalSelect: boolean = false;
    defaultProxies: Proxy[] = [
        {
            host: 'pocketnet.app', 
            port: '8899',
            wss: '8099',
            key: 'pocketnet.app:8899:8099',
            default: true
        }, 
        {
            host: '1.pocketnet.app', 
            port: '8899',
            wss: '8099',
            key: '1.pocketnet.app:8899:8099',
            default: true
        }
    ];

    addedProxies: Proxy[] = [];
    selectedUse = 'pocketnet.app:8899';
    selectedWatch: string = 'pocketnet.app:8899';
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

    get selectedProxy(): string {

        return this.dataService.selectedProxy;
    }


    get proxies() : Proxy[]{

        return [
            ...this.defaultProxies, 
            ...this.addedProxies
        ].map(proxy => ({
            ...proxy, 
            selected: 'https://' + proxy.host + ':' + proxy.port === this.selectedProxy
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
        localStorage.setItem('explorerListofproxies', JSON.stringify(this.addedProxies));
    }

    setProxy(idx){

        idx -= this.defaultProxies.length;

        if (idx > -1){

            this.newProxy = {...this.addedProxies[idx]}

            this.openModalAdd();

        } else {

            console.log('This proxy doesnt exsist');
        }


    }

    async addProxyItem(){  


        const key = this.createKey(this.newProxy);

        if (this.proxies.find(proxy => proxy.key === key && proxy.key !== this.newProxy.key)){

            this.showError('You already have this proxy in list.');

        } else {


            this.dataService.checkProxy('https://' + this.newProxy.host + ':' + this.newProxy.port).subscribe((data: any) => {

                if (data.result === 'success'){

                    if (this.newProxy.key){
    
                        const idx = this.addedProxies.findIndex(proxy => proxy.key === this.newProxy.key);
        
                        if (idx > -1){
        
                            this.addedProxies.splice(idx, 1, {...this.newProxy, key});
        
                        } else {
        
                            this.addedProxies.push({...this.newProxy, key});
                        }
        
                    } else {
        
                        this.newProxy.key = key;
        
                        this.addedProxies.push({...this.newProxy})
                                
                    }
        
                    localStorage.setItem('explorerListofproxies', JSON.stringify(this.addedProxies))
        
                    this.newProxy = {
                        host: '',
                        port: '8899',
                        wss: '8099'
                    }
            

                    this.closeModalAdd();

                } else {

                    this.showError("You can't use this proxy")
                }

            }, err => {
                
                console.log('err', err); 
                this.showError("You can't use this proxy")
            
            });
        }


    }

    selectProxyUrl(proxy){

        this.dataService.selectProxyUrl('https://' + proxy.host + ':' + proxy.port);
    }


    createKey(proxy){

        return proxy.host + ':' + proxy.port + ':' + proxy.wss;
    }

    trackByFn(index, item) {    
        return item.key;
     }
    
    ngOnInit() {
        const explorerListofproxies = localStorage.getItem('explorerListofproxies');

        if (explorerListofproxies){
            this.addedProxies = JSON.parse(explorerListofproxies);
        }
    }

}
