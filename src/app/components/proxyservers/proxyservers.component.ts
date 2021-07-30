import { Component, OnInit } from '@angular/core';
import { Globals } from 'src/app/globals';
import { ToastrService } from 'ngx-toastr';
import {DataService} from 'src/app/services/data.service';
import {Proxy} from 'src/app/types/Proxy';

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

    show: boolean = false;
    txtSuccessSelect: string = 'Add proxy';
    txtSuccessAdd: string = 'Add';
    txtSuccessSave: string = 'Save';
    useproxy: null | string = localStorage.getItem('')

    displayModalSelect: boolean = false;

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

    toggleShow() {
        this.show = !this.show;
    }

    get useProxy(){

        return this.dataService.useProxy;
    }

    get defaultProxies(){
        return this.dataService.defaultProxies
    }


    get Global() : Globals {
        return this.global;
    }

    get proxy() {
        return this.dataService.proxy;
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
            selected: proxy.key === this.proxy.key
        }));

    }

    changeUseProxy(){

        this.dataService.changeUseProxy();

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

        const defaultIdx = idx - this.defaultProxies.length;

        const lastProxies = [...this.proxies]

        this.addedProxies.splice(defaultIdx, 1);
        localStorage.setItem('explorerListofproxies', JSON.stringify(this.addedProxies));

        console.log('idx', idx, lastProxies)
        
        if (lastProxies[idx].key === this.proxy.key){

            this.dataService.selectProxy(this.proxies[0]);
            
        }


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

    selectProxy(proxy){

        this.dataService.selectProxy(proxy);
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
