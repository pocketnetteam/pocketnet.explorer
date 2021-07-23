import { Injectable } from '@angular/core';
import { BlockchainInfo } from './types/BlockchainInfo';
import { PeerInfo } from './types/PeerInfo';

@Injectable()
export class Globals {
    blockchainInfo: BlockchainInfo;
    peersinfo: PeerInfo[];
    nodes: any[]
}