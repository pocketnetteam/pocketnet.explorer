import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HexService } from './hex.service'

@Injectable({
    providedIn: 'root'
})
export class DataService {
    private proxyUrl = 'https://pocketnet.app:8888/rpc';
    // private proxyUrl = 'https://localhost:8888/rpc';
    // private proxyUrl = 'https://192.168.0.11:8888/rpc';
    // private proxyUrl = 'https://ironbot:8888/rpc';
    private node = JSON.stringify({"host":"188.187.45.218","port":"38081","ws":"8087"})

    constructor(private http: HttpClient, private hex: HexService) { }

    getBlock(hash: string, verbose: boolean=true) {
        // https://pocketnet.app:8888/rpc?method=getmissedinfo&parameters=5b22505138416943484a61545a4154687232546e706b515944795664314869647134504d222c33373138345d&node=3

        return this.http.get(this.proxyUrl, {
            params: {
                method: 'getblock',
                parameters: this.hex.Encode(JSON.stringify([ hash, (verbose ? 1 : 0) ])),
                nodelocally: this.node
            }
        });
    }

    getAddressInfo(hash: string) {
        return this.http.get(this.proxyUrl, {
            params: {
                method: 'getaddressinfo',
                parameters: this.hex.Encode(JSON.stringify([ hash ])),
                nodelocally: this.node
            }
        });
    }

    getTransactions(tx: string[]) {
        return this.http.get(this.proxyUrl, {
            params: {
                method: 'gettransactions',
                parameters: this.hex.Encode(JSON.stringify([ tx ])),
                nodelocally: this.node
            }
        });
    }

    getLastBlocks(count: number, last_height: number = -1, verbose: boolean = false) {
        return this.http.get(this.proxyUrl, {
            params: {
                method: 'getlastblocks',
                parameters: this.hex.Encode(JSON.stringify([ count, last_height, verbose ])),
                nodelocally: this.node
            }
        });
    }

    checkStringType(value: string) {
        return this.http.get(this.proxyUrl, {
            params: {
                method: 'checkstringtype',
                parameters: this.hex.Encode(JSON.stringify([ value ])),
                nodelocally: this.node
            }
        });
    }

    getBlockchainInfo() {
        return this.http.get(this.proxyUrl, {
            params: {
                method: 'getblockchaininfo',
                parameters: this.hex.Encode(JSON.stringify([])),
                nodelocally: this.node
            }
        });
    }

    getStatistic(end_time: Number = 0, start_time: Number = 0, round: Number = 8600 * 24) {
        return this.http.get(this.proxyUrl, {
            params: {
                method: 'getstatistic',
                parameters: this.hex.Encode(JSON.stringify([end_time, start_time, round])),
                nodelocally: this.node
            }
        });
    }

    getPeerInfo() {
        return this.http.get(this.proxyUrl, {
            params: {
                method: 'getpeerinfo',
                parameters: this.hex.Encode(JSON.stringify([])),
                nodelocally: this.node
            }
        });
    }
}
