import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HexService } from './hex.service'

@Injectable({
    providedIn: 'root'
})
export class DataService {

    private proxyUrl = 'https://pocketnet.app:8888/rpc';
    private explorerUrl = 'https://explorer.pocketnet.app/rest/'
    private node = "216.108.231.28";

    constructor(private http: HttpClient, private hex: HexService) { }

    async getTopAddresses() {

        const data = await fetch(this.explorerUrl + 'topaddresses/30.json');
        const result = await data.json();
        return result
    }

    getBlock(hash: string, verbose: boolean=true) {
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

    getLastBlocks(count: number, last_height: number = -1, verbose: boolean = false) {
        return this.http.get(this.proxyUrl, {
            params: {
                method: 'getlastblocks',
                parameters: this.hex.Encode(JSON.stringify([ count, last_height, verbose ])),
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

    getStatistic(end_time: Number = 0, start_time: Number = 0, round: Number = 8600 * 24) {
        return this.http.get(this.proxyUrl, {
            params: {
                method: 'getstatistic',
                parameters: this.hex.Encode(JSON.stringify([end_time, start_time, round])),
                node: this.node
            }
        });
    }

    getPeerInfo() {
        return this.http.get(this.proxyUrl, {
            params: {
                method: 'getpeerinfo',
                parameters: this.hex.Encode(JSON.stringify([])),
                node: this.node
            }
        });
    }
}
