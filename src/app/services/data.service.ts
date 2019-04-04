import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HexService } from './hex.service'

@Injectable({
    providedIn: 'root'
})
export class DataService {
    private proxyUrl = 'https://pocketnet.app:8888/rpc';
    // private proxyUrl = 'https://216.108.237.11:8888/rpc';
    private node = '2';

    constructor(private http: HttpClient, private hex: HexService) { }

    getBlock(hash: string, verbose: boolean=true) {
        // https://pocketnet.app:8888/rpc?method=getmissedinfo&parameters=5b22505138416943484a61545a4154687232546e706b515944795664314869647134504d222c33373138345d&node=3

        return this.http.get(this.proxyUrl, {
            params: {
                method: 'getblock',
                parameters: this.hex.Encode(JSON.stringify([ hash, (verbose ? 1 : 0) ])),
                node: this.node
            }
        });
    }

    getAddressInfo(hash: string) {
        return this.http.get(this.proxyUrl, {
            params: {
                method: 'getaddressinfo',
                parameters: this.hex.Encode(JSON.stringify([ hash ])),
                node: this.node
            }
        });
    }

    getTransactions(tx: string[]) {
        return this.http.get(this.proxyUrl, {
            params: {
                method: 'gettransactions',
                parameters: this.hex.Encode(JSON.stringify([ tx ])),
                node: this.node
            }
        });
    }

    getLastBlocks(count: number) {
        return this.http.get(this.proxyUrl, {
            params: {
                method: 'getlastblocks',
                parameters: this.hex.Encode(JSON.stringify([ count ])),
                node: this.node
            }
        });
    }

    checkStringType(value: string) {
        return this.http.get(this.proxyUrl, {
            params: {
                method: 'checkstringtype',
                parameters: this.hex.Encode(JSON.stringify([ value ])),
                node: this.node
            }
        });
    }

    getBlockchainInfo() {
        return this.http.get(this.proxyUrl, {
            params: {
                method: 'getblockchaininfo',
                parameters: this.hex.Encode(JSON.stringify([])),
                node: this.node
            }
        });
    }
}
