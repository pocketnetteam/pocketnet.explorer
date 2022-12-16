export class BlockCompact {
    public hash: string;
    public height: number;
    public time: number;
    public ntx: number;
    public types: any[];
}

export class Block {
    public hash: string;
    public confirmations: number;
    public strippedsize: number;
    public size: number;
    public weight: number;
    public height: number;
    public version: string;
    public merkleroot: string;
    public tx: string[];
    public time: number;
    public mediantime: number;
    public nonce: number;
    public bits: string;
    public difficulty: number;
    public chainwork: string;
    public nTx: number;
    public previousblockhash: string;
    public nextblockhash: string;
}

/*
{
  "hash": "00000fa8eea79755647e872a7ed31e7ac782e382fa7e2d7c74e1e73e337da281",
  "confirmations": 37103,
  "strippedsize": 254,
  "size": 290,
  "weight": 1052,
  "height": 14,
  "version": 536870912,
  "versionHex": "20000000",
  "merkleroot": "501185095e6bbeced345ae1985265d89c6a6f803e4a25494f93c19e70ce81511",
  "tx": [
    "501185095e6bbeced345ae1985265d89c6a6f803e4a25494f93c19e70ce81511"
  ],
  "time": 1549813403,
  "mediantime": 1549813039,
  "nonce": 22645,
  "bits": "1e0fffff",
  "difficulty": 0.0002441371325370145,
  "chainwork": "0000000000000000000000000000000000000000000000000000000000f0000f",
  "nTx": 1,
  "previousblockhash": "0000027396afc5b86ef53cd496141937e41c6cd6123942e4a7413d0026e09738",
  "nextblockhash": "00000dd22c623baf707a2cca34d75c6ac766bf28b514ed0170111d16912f5ed8"
}
*/