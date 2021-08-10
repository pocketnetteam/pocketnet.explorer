import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HexService } from './hex.service'

import { Proxy } from '../types/Proxy';
import { toUnicode } from 'punycode';
import { Observable } from 'rxjs';

const proxy = localStorage.getItem('explorerProxy');

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
            default: false
        }, 
        {
            host: 'test.pocketnet.app', 
            port: '8899',
            wss: '8099',
            key: 'test.pocketnet.app:8899:8099',
            default: false
        }
    ];

    public currentLocation: any = window.location.host == 'localhost:4200' ? '192.168.0.33:37171' : window.location.host;
    public useProxy: string | null = localStorage.getItem('explorerUseProxy')

    public proxy = proxy ? JSON.parse(proxy) : this.defaultProxies[0]

    private explorerUrl = 'https://explorer.pocketnet.app/rest/'
    private defaultNode = localStorage.getItem("explorerNode" ) || "65.21.57.14:38081";
    private node =  this.useProxy ? this.defaultNode : this.currentLocation;

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

    get apiUrlRoot() {
        return `http://${this.node}/public/`;
    }

    changeUseProxy(){

        if (this.useProxy){

            localStorage.removeItem('explorerUseProxy');

        } else {

            localStorage.setItem('explorerUseProxy', 'true');
        }

        location.reload();
    }

    _execute(request: Observable<Object>, success: Function = () => {}, failed: Function = () => {}) {
        request.subscribe(answer => {
            if (answer["error"] || !answer["result"])
                failed(answer);

            success(answer["result"]);
        });
    }

    _executeProxy(request: Observable<Object>, success: Function = () => {}, failed: Function = () => {}) {
        request.subscribe(answer => {
            if (!answer["result"] || answer["result"] != 'success' || !answer["data"])
                failed(answer);

            success(answer["data"]);
        });
    }

    checkProxy(url: string, success: Function = () => {}, failed: Function = () => {}){
        return this.http.get(url + '/ping');
    }

    getTopAddresses(success: Function = () => {}, failed: Function = () => {}) {
        return this.http.get(this.explorerUrl + 'topaddresses/30.json');
    }

    getCompactBlock(hash: string, success: Function = () => {}, failed: Function = () => {}) {
        this._execute(
            this.http.post(this.apiUrlRoot + 'getcompactblock', {
                method: 'getcompactblock',
                params: [ hash ]
            }),
            success, failed
        );        
    }

    getAddressInfo(hash: string, success: Function = () => {}, failed: Function = () => {}) {
        this._execute(
            this.http.post(this.apiUrlRoot + 'getaddressspent', {
                method: 'getaddressspent',
                params: [ hash ]
            }),
            success, failed
        );
    }

    getAddressTransactions(address: string, pageinit: number,
        pageStart: number, pageSize: number,
        success: Function = () => {}, failed: Function = () => {})
    {
        this._execute(
            this.http.post(this.apiUrlRoot + 'getaddresstransactions', {
                method: 'getaddresstransactions',
                params: [ address, pageinit, pageStart, pageSize ]
            }),
            success, failed
        );
    }

    getBlockTransactions(block: string, pageStart: number, pageSize: number, success: Function = () => {}, failed: Function = () => {})
    {
        this._execute(
            this.http.post(this.apiUrlRoot + 'getblocktransactions', {
                method: 'getblocktransactions',
                params: [ block, pageStart, pageSize ]
            }),
            success, failed
        );
    }

    getTransactions(hashes: string[], success: Function = () => {}, failed: Function = () => {})
    {
        this._execute(
            this.http.post(this.apiUrlRoot + 'gettransactions', {
                method: 'gettransactions',
                params: [ hashes ]
            }),
            success, failed
        );
    }

    getLastBlocks(count: number, last_height: number = -1, verbose: boolean = false, success: Function = () => {}, failed: Function = () => {}) {
        this._execute(
            this.http.post(this.apiUrlRoot + 'getlastblocks', {
                method: 'getlastblocks',
                params: [ count, last_height, verbose ]
            }),
            success, failed
        );
    }

    checkStringType(value: string, success: Function = () => {}, failed: Function = () => {}) {
        this._execute(
            this.http.post(this.apiUrlRoot + 'searchbyhash', {
                method: 'searchbyhash',
                params: [ value ]
            }),
            success, failed
        );
    }

    getBlockchainInfo(success: Function = () => {}, failed: Function = () => {}) {
        this._execute(
            this.http.post(this.apiUrlRoot + 'getnodeinfo', {
                method: 'getnodeinfo',
                params: [] 
            }), success, failed
        );
    }

    getStatistic(end_time: Number = 0, depth: Number = 1, success: Function = () => {}, failed: Function = () => {}) {
        this._execute(
            this.http.post(this.apiUrlRoot + 'getstatistic', {
                method: 'getstatistic',
                params: [end_time, depth] 
            }),
            success, failed
        );
    }

    getPeerInfo(success: Function = () => {}, failed: Function = () => {}) {
        this._execute(
            this.http.post(this.apiUrlRoot + 'getpeerinfo', {
                method: 'getpeerinfo',
                params: []
            }),
            success, failed
        );
    }

    getNodes(success: Function = () => {}, failed: Function = () => {}) {
        this._executeProxy(
            this.http.get(this.selectedProxy + '/info'),
            success, failed
        );
    }

    setNodes(nodes) {
        this.nodes = nodes;
    }
    

    async selectProxy(proxy){
        this.proxy = proxy;
        this.getNodes((res: any) => {
            try {
                const nodes = res.info.nodeManager.nodes

                if (nodes){
                    console.log('nodes', nodes)
                    const keys = Object.keys(nodes); 

                    if (keys.length && keys.indexOf(this.node) === -1){
                        this.selectNode(keys[0]);
                    }
                }
            }  catch (err){
                console.log('err', err);
            }

            localStorage.setItem('explorerProxy', JSON.stringify(this.proxy));
            location.reload()
        })
    }

    selectNode(node){

        this.node = node;
        localStorage.setItem('explorerNode', this.node);
        location.reload()
    }


}
