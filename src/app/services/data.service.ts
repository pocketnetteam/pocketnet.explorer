import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HexService } from './hex.service'

@Injectable({
    providedIn: 'root'
})
export class DataService {

    private proxy = localStorage.getItem('explorerProxyUrl') || 'https://pocketnet.app:8899';
    private explorerUrl = 'https://explorer.pocketnet.app/rest/'
    private node =  localStorage.getItem("explorerNode" ) || "65.21.57.14:38081";

    public nodes: any[] = []

    constructor(private http: HttpClient, private hex: HexService) { }

    get selectedProxy(){
        return this.proxy;
    }

    get selectedNode(){
        return this.node
    }

    get proxyUrl(){
        return this.proxy + '/rpc';
    }

    async getTopAddresses() {

        const data = await fetch(this.explorerUrl + 'topaddresses/30.json');
        const result = await data.json();
        return result

    }

    getBlock(hash: string, verbose: boolean=true) {
        return this.http.post(this.proxyUrl + '/getblock', {
            method: 'getblock',
            parameters: this.hex.Encode(JSON.stringify([ hash, (verbose ? 1 : 0) ])),
            node: this.node
        });
    }

    getAddressInfo(hash: string) {
        return this.http.post(this.proxyUrl + '/getaddressinfo', {
            method: 'getaddressinfo',
            parameters: this.hex.Encode(JSON.stringify([ hash ])),
            node: this.node
        });
    }

    getTransactions(tx: string[]) {
        return this.http.post(this.proxyUrl + '/gettransactions', {
            method: 'gettransactions',
            parameters: this.hex.Encode(JSON.stringify([ tx ])),
            node: this.node
        });
    }

    getLastBlocks(count: number, last_height: number = -1, verbose: boolean = false) {
        return this.http.post(this.proxyUrl + '/getlastblocks', {
            method: 'getlastblocks',
            parameters: [ count, last_height, verbose ],
            node: this.node
        });
    }

    checkStringType(value: string) {
        return this.http.post(this.proxyUrl + '/checkstringtype', {
            method: 'checkstringtype',
            parameters: this.hex.Encode(JSON.stringify([ value ])),
            node: this.node
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
        return this.http.get(this.proxy + '/info').subscribe((res: any) => {
            
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

    selectProxyUrl(url){

        this.proxy = url;
        localStorage.setItem('explorerProxyUrl', this.proxy);
        location.reload()
    }

    selectNode(node){

        this.node = node;
        localStorage.setItem('explorerNode', this.node);
        location.reload()
    }
}
