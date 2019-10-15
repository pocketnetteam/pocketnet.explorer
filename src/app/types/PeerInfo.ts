export class PeerInfo {
    public id             : number;      // 1
    public addr           : string;      // "64.235.41.74:38080"
    public addrlocal      : string;      // "84.52.69.110:49888"
    public addrbind       : string;      // "192.168.0.15:49888"
    public relaytxes      : boolean;     // true
    public lastsend       : number;      // 1570951279
    public lastrecv       : number;      // 1570951235
    public bytessent      : number;      // 11786201
    public bytesrecv      : number;      // 31814983
    public conntime       : number;      // 1570792510
    public timeoffset     : number;      // -1
    public pingtime       : number;      // 0.197694
    public minping        : number;      // 0.196573
    public version        : number;      // 70015
    public subver         : string;      // "/Satoshi:0.18.8/"
    public inbound        : boolean;     // false
    public addnode        : boolean;     // true
    public startingheight : number;      // 348364
    public banscore       : number;      // 0
    public synced_headers : number;      // 350994
    public synced_blocks  : number;      // 350994
    public inflight       : number[];    // []
    public whitelisted    : boolean;     // false
    public minfeefilter   : number;      // 0.00001000
}

/*

{
    "id": 1,
    "addr": "64.235.41.74:38080",
    "addrlocal": "84.52.69.110:49888",
    "addrbind": "192.168.0.15:49888",
    "services": "000000000000040d",
    "relaytxes": true,
    "lastsend": 1570951279,
    "lastrecv": 1570951235,
    "bytessent": 11786201,
    "bytesrecv": 31814983,
    "conntime": 1570792510,
    "timeoffset": -1,
    "pingtime": 0.197694,
    "minping": 0.196573,
    "version": 70015,
    "subver": "/Satoshi:0.18.8/",
    "inbound": false,
    "addnode": true,
    "startingheight": 348364,
    "banscore": 0,
    "synced_headers": 350994,
    "synced_blocks": 350994,
    "inflight": [],
    "whitelisted": false,
    "minfeefilter": 0.00001000,
    "bytessent_per_msg": {
        "addr": 110,
        "block": 8545679,
        "blocktxn": 365919,
        "cmpctblock": 1645818,
        "feefilter": 32,
        "getaddr": 24,
        "getblocktxn": 16300,
        "getdata": 721621,
        "getheaders": 1021,
        "headers": 152025,
        "inv": 193246,
        "ping": 42336,
        "pong": 42336,
        "sendcmpct": 12408,
        "sendheaders": 24,
        "tx": 47152,
        "verack": 24,
        "version": 126
    },
    "bytesrecv_per_msg": {
        "addr": 915,
        "block": 28853901,
        "blocktxn": 583403,
        "cmpctblock": 1167438,
        "feefilter": 32,
        "getblocktxn": 14268,
        "getdata": 252429,
        "getheaders": 1021,
        "headers": 64560,
        "inv": 118073,
        "ping": 42336,
        "pong": 42336,
        "sendcmpct": 10659,
        "sendheaders": 24,
        "tx": 663438,
        "verack": 24,
        "version": 126
    }
}

*/