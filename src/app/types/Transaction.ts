class ScriptSig {
    public asm: string;
    public hex: string;
}

class ScriptPubKey {
    public addresses: string[];
}

export class Vin {
    public txid: string;
    public vout: number;
    public address: string;
    public value: number;
}

export class Vout {
    public value: number;
    public n: number;
    public scriptPubKey: ScriptPubKey;
    public spent: number;
}

export class Transaction {
    public rowNumber: number;
    public type: number;
    public txid: string;
    public nTime: number;
    public height: number;
    public blockHash: string;
    public vin: Vin[];
    public vout: Vout[];
}

export const enum Types {
    NotSupported = 0,

    Money = 1,
    Coinbase = 2,
    Coinstake = 3,

    AccountUser = 100,
    AccountVideoServer = 101,
    AccountMessageServer = 102,

    Post = 200,
    Video = 201,
    Article = 202,
    // ServerPing = 203,

    Comment = 204,
    CommentEdit = 205,
    CommentDelete = 206,

    ContentDelete = 207,
    
    BoostContent = 208,

    Score = 300,
    ScoreComment = 301,

    Subscribe = 302,
    SubscribePrivate = 303,
    Unsubscribe = 304,

    Blocking = 305,
    Unblocking = 306,

    Complain = 307,
}

/*

{
  "txid": "14c6d9bc3a0decebef49af49840211532a74d2381696316ee35c21c113dcc6bd",
  "hash": "14c6d9bc3a0decebef49af49840211532a74d2381696316ee35c21c113dcc6bd",
  "version": 2,
  "nTime": 1551988960,
  "size": 224,
  "vsize": 224,
  "weight": 896,
  "locktime": 0,
  "coinbase": false,
  "coinstake": true,
  "vin": [
    {
      "txid": "780e5acc737f630c4e3d8522be46e1e7b6072359e53de0f16a46b7a018fd49d5",
      "vout": 1,
      "scriptSig": {
        "asm": "304402202c6893167ac0158dee6357abfb0fc1b94ddcefdb10af64a4f2893d9c9c63771d02201da72c84d5857c8835c300a5fbd1645bfa32f3b3a547823689b49c9cc6b22afa[ALL]",
        "hex": "47304402202c6893167ac0158dee6357abfb0fc1b94ddcefdb10af64a4f2893d9c9c63771d02201da72c84d5857c8835c300a5fbd1645bfa32f3b3a547823689b49c9cc6b22afa01"
      },
      "sequence": 4294967295
    }
  ],
  "vout": [
    {
      "value": 0.00000000,
      "n": 0,
      "scriptPubKey": {
        "asm": "",
        "hex": "",
        "type": "nonstandard"
      }
    },
    {
      "value": 51.96000000,
      "n": 1,
      "scriptPubKey": {
        "asm": "035f34d25e33a96b8da9194200c7c051ea72a54add81819dd2a0e8e91cdd64bb46 OP_CHECKSIG",
        "hex": "21035f34d25e33a96b8da9194200c7c051ea72a54add81819dd2a0e8e91cdd64bb46ac",
        "reqSigs": 1,
        "type": "pubkey",
        "addresses": [
          "P9XVbrNbZ7Qq2t2KX1AysKc92cmLZHjK8r"
        ]
      }
    },
    {
      "value": 51.97000000,
      "n": 2,
      "scriptPubKey": {
        "asm": "035f34d25e33a96b8da9194200c7c051ea72a54add81819dd2a0e8e91cdd64bb46 OP_CHECKSIG",
        "hex": "21035f34d25e33a96b8da9194200c7c051ea72a54add81819dd2a0e8e91cdd64bb46ac",
        "reqSigs": 1,
        "type": "pubkey",
        "addresses": [
          "P9XVbrNbZ7Qq2t2KX1AysKc92cmLZHjK8r"
        ]
      }
    }
  ],
  "hex": "02000000e078815c01d549fd18a0b7466af1e03de5592307b6e7e146be22853d4e0c637f73cc5a0e78010000004847304402202c6893167ac0158dee6357abfb0fc1b94ddcefdb10af64a4f2893d9c9c63771d02201da72c84d5857c8835c300a5fbd1645bfa32f3b3a547823689b49c9cc6b22afa01ffffffff0300000000000000000000abb435010000002321035f34d25e33a96b8da9194200c7c051ea72a54add81819dd2a0e8e91cdd64bb46ac40edc335010000002321035f34d25e33a96b8da9194200c7c051ea72a54add81819dd2a0e8e91cdd64bb46ac00000000",
  "blockhash": "d41363f9c5796348cc6c074757da47c5d7e5869926b644e7b727cb606e61e687",
  "confirmations": 2,
  "time": 1551988960,
  "blocktime": 1551988960
}

*/