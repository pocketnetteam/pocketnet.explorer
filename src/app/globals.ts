import { Injectable } from '@angular/core';
import { BlockchainInfo } from './types/BlockchainInfo';

@Injectable()
export class Globals {
    blockchainInfo: BlockchainInfo;
}