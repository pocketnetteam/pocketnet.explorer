import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HexService } from './hex.service'

import {Proxy} from '../types/Proxy';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    public defaultProxies: Proxy[] = [
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

    public proxy = localStorage.getItem('explorerProxy') ? JSON.parse(localStorage.getItem('explorerProxy')) : this.defaultProxies[0]
    private explorerUrl = 'https://explorer.pocketnet.app/rest/'
    private node =  localStorage.getItem("explorerNode" ) || "65.21.57.14:38081";

    public nodes: any[] = []

    constructor(private http: HttpClient, private hex: HexService) { }

    get selectedNode(){
        return this.node
    }
    
    get selectedProxy(){
        return 'https://' + this.proxy.host + ':' + this.proxy.port
    }

    get proxyUrl(){
        return this.selectedProxy + '/rpc';
    }

    checkProxy(url: string){

        return this.http.get(url + '/ping');
    }

    getTopAddresses() {

        return this.http.get(this.explorerUrl + 'topaddresses/30.json');

    }

    getBlock(hash: string, verbose: boolean=true) {
        return this.http.post(this.proxyUrl + '/getblock', {
            method: 'getblock',
            parameters: [ hash, (verbose ? 1 : 0) ],
            options: {
                node: this.node
            }
        });
    }

    getAddressInfo(hash: string) {
        return this.http.post(this.proxyUrl + '/getaddressinfo', {
            method: 'getaddressinfo',
            parameters: [ hash ],
            options: {
                node: this.node
            }
        });
    }

    getTransactions(tx: string[]) {
        return this.http.post(this.proxyUrl + '/gettransactions', {
            method: 'gettransactions',
            parameters: [ tx ],
            options: {
                node: this.node
            }
        });
    }

    getLastBlocks(count: number, last_height: number = -1, verbose: boolean = false) {
        return this.http.post(this.proxyUrl + '/getlastblocks', {
            method: 'getlastblocks',
            parameters: [ count, last_height, verbose ],
            options: {
                node: this.node
            }
        });
    }

    checkStringType(value: string) {
        return this.http.post(this.proxyUrl + '/checkstringtype', {
            method: 'checkstringtype',
            parameters: [ value ],
            options: {
                node: this.node
            }
        });
    }

    getBlockchainInfo() {
        return this.http.post(this.proxyUrl + '/getnodeinfo', {
            method: 'getnodeinfo',
            parameters: [],
            options: {
                node: this.node
            }
            
        });
    }

    getStatistic(end_time: Number = 0, start_time: Number = 0, round: Number = 8600 * 24) {
        return this.http.post(this.proxyUrl  + '/getstatistic', {
                method: 'getstatistic',
                parameters: [end_time, start_time, round],
                options: {
                    node: this.node    
                }
                
        });
    }

    getPeerInfo() {
        return this.http.post(this.proxyUrl + '/getpeerinfo', {
                method: 'getpeerinfo',
                parameters: [],
                options: {
                    node: this.node
                }
                
        });
    }

    getNodes() {
        return this.http.get(this.selectedProxy + '/info').subscribe((res: any) => {
            
            try {

                const nodes = res.data.info.nodeManager.nodes

                if (nodes){
                    this.nodes = Object.values(nodes);
                }

            } catch(err){

                console.log('err', err);
            }

        });
    }

    selectProxy(proxy){

        this.proxy = proxy;
        localStorage.setItem('explorerProxy', JSON.stringify(this.proxy));
        location.reload()
    }

    selectNode(node){

        this.node = node;
        localStorage.setItem('explorerNode', this.node);
        location.reload()
    }
}
