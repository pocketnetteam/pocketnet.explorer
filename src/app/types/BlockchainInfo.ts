export class BlockchainInfo {
    public chain : string;
    public netstakeweight : number;
    public version: string;
    public lastblock : {
        height: number,
        time: number
    }
}