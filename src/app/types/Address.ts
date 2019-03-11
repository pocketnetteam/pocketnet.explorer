import { Transaction } from './Transaction';

export class Address {
    public address: string;
    public spent: number;
    public unspent: number;
    public txids: string[];
}