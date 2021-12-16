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
            host: '2.pocketnet.app', 
            port: '8899',
            wss: '8099',
            key: '2.pocketnet.app:8899:8099',
            default: false
        },
        {
            host: '3.pocketnet.app', 
            port: '8899',
            wss: '8099',
            key: '3.pocketnet.app:8899:8099',
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

    public proxy = proxy ? JSON.parse(proxy) : this.defaultProxies[0]

    private explorerUrl = 'https://explorer.pocketnet.app/rest/'
    private defaultNode = localStorage.getItem("explorerNode"); // '135.181.196.243:38081'; //
    private node =  this.defaultNode;

    public nodes: any[] = []


    constructor(private http: HttpClient, private hex: HexService) { }


    get selectedNode(){
        return this.node
    }
    
    get selectedProxy(){
        return 'https://' + this.proxy.host + ':' + this.proxy.port
    }

    get proxyUrl() {
        return this.selectedProxy + '/rpc/';
    }

    _executeGET(method: string, success: Function = () => {}, failed: Function = () => {}) {
        this.http.get(this.selectedProxy + method)
            .subscribe(answer => {
                if (!answer["result"] || answer["result"] != 'success' || !answer["data"])
                    failed(answer);

                success(answer["data"]);
            });
    }

    _executePOST(method: string, prms: Object, success: Function = () => {}, failed: Function = () => {})
    {
        prms['options'] = { node: this.node };

        this.http.post(this.proxyUrl + method, prms)
            .subscribe(answer => {
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

    getCompactBlock(hash: string = '', number: number = -1, success: Function = () => {}, failed: Function = () => {}) {
        this._executePOST(
            'getcompactblock',
            {
                method: 'getcompactblock',
                parameters: [ hash, number ]
            },
            success, failed
        );        
    }

    getAddressInfo(hash: string, success: Function = () => {}, failed: Function = () => {}) {
        this._executePOST(
            'getaddressinfo',
            {
                method: 'getaddressinfo',
                parameters: [ hash ]
            },
            success, failed
        );
    }

    getAddressTransactions(address: string, pageinit: number,
        pageStart: number, pageSize: number,
        success: Function = () => {}, failed: Function = () => {})
    {
        this._executePOST(
            'getaddresstransactions',
            {
                method: 'getaddresstransactions',
                parameters: [ address, pageinit, pageStart, pageSize ]
            },
            success, failed
        );
    }

    getBlockTransactions(block: string, pageStart: number, pageSize: number, success: Function = () => {}, failed: Function = () => {})
    {
        this._executePOST(
            'getblocktransactions',
            {
                method: 'getblocktransactions',
                parameters: [ block, pageStart, pageSize ]
            },
            success, failed
        );
    }

    getTransactions(hashes: string[], success: Function = () => {}, failed: Function = () => {})
    {
        this._executePOST(
            'gettransactions',
            {
                method: 'gettransactions',
                parameters: [ hashes ]
            },
            success, failed
        );
    }

    getLastBlocks(count: number, last_height: number = -1, verbose: boolean = false, success: Function = () => {}, failed: Function = () => {}) {
        this._executePOST(
            'getlastblocks',
            {
                method: 'getlastblocks',
                parameters: [ count, last_height, verbose ]
            },
            success, failed
        );
    }

    checkStringType(value: string, success: Function = () => {}, failed: Function = () => {}) {
        this._executePOST(
            'searchbyhash',
            {
                method: 'searchbyhash',
                parameters: [ value ]
            },
            success, failed
        );
    }

    getBlockchainInfo(success: Function = () => {}, failed: Function = () => {}) {
        this._executePOST(
            'getnodeinfo',
            {
                method: 'getnodeinfo',
                parameters: [] 
            },
            success, failed
        );
    }

    getStatistic(type: Number, success: Function = () => {}, failed: Function = () => {}) {
        let method = 'getstatisticbyhours';
        if (type == 2)
            method = 'getstatisticbydays';

        this._executePOST(
            method,
            {
                method: method,
                parameters: [] 
            },
            success, failed
        );
    }

    getStatisticContent(success: Function = () => {}, failed: Function = () => {}) {
        this._executePOST(
            'getstatisticcontent',
            {
                method: 'getstatisticcontent',
                parameters: [] 
            },
            success, failed
        );
    }

    getPeerInfo(success: Function = () => {}, failed: Function = () => {}) {
        this._executePOST(
            'getpeerinfo',
            {
                method: 'getpeerinfo',
                parameters: []
            },
            success, failed
        );
    }

    getNodes(success: Function = () => {}, failed: Function = () => {}) {
        this._executeGET(
            '/info',
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
