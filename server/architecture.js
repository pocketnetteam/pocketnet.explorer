/*   DATA OBJECTS


  nblocks      zset (height, blockid)

  blocks       hset <blockid, {json}>

  transactions hset <txid, {json}>

  addresses    hset <txid, (+-summ, time)>

*/
start() {
    GENESIS = '1111111111';

    data = rpc.getBlockchainInfo();

    blockcount = redis.zcard("nblocks");

    if (blockcount >= 0 && data.blocks < blockcount * 2) // Have more than a half data - start from top
    {
        getBlockRecursive(data.bestblockhash);
    } else {
        rpc.getBlockchHash(0); // No data or less than a half - start from beginning
        GENESIS = data.hash;
        getBlockRecursive(GENESIS);
    }
}

getBlockRecursive(blockid) {
    data = rpc.getBlock(blockid);

    if ((blockid == GENESIS || exists(data.previousblockhash)) && !exists(blockid)) {

        if (exists(data.height)) // To be sure we delete old block version with same height
        {
            invalidateBlock(blockid);
        }

        writeBlock(data);
        if (data.nextblockhash != null) getBlockRecursive(data.nextblockhash); // Go up
    } else {
        if (data.previousblockhash != null) getBlockRecursive(data.previousblockhash); // Go down
    }
}


writeBlock(data) {
    pipe = redis.pipeline();

    // Write nblocks      zset (height, blockid)
    pipe.zincrby('nblocks', height, blockid);

    // Write blocks       hset <blockid, {json}>
    pipe.hset("blocks", blockid, JSON.stringify(data));

    foreach(tx in data.tx) {
        txdata = rpc.getTransaction(tx);
        writeTransaction(pipe, txdata);
    }

    pipe.execute();
}

writeTransaction(pipe, data) {
    foreach(vin in data.vin) {
        address = resolveInput(srcTx, vout);
        addressSum = getAddressSum(address);

        vin.appendChild("address", address);

        //addresses    hset <txid, (+-summ, time)>
        pipe.hset(address, data.txid, JSON.stringify({-1 * addressSum, data.nTime }));
    }

    foreach(vout in data.vout) {
        address = vout.scriptPubKey.addresses[0];
        if (address != null) {
            //addresses    hset <txid, (+-summ, time)>
            pipe.hset(address, data.txid, JSON.stringify({ vout.value, data.nTime }));
        }
    }

    //transactions hset <txid, {json}>
    pipe.hset("transactions", txid, JSON.stringify(data));
}


string resolveInput(srcTx, vout) {
    data = redis.hget("transactions", srcTx);
    address = data.vout[vout].scriptPubKey.addresses[0]; //  ?!?!?!?   why 0 ?
    return address;
}


int getAddressSum(address) {
    sum = 0;
    foreach(tx in redis.hkeys(address)) // Get all tx from and to address
    {
        sum = sum + redis.hget(address, tx).summ;
    }
    return sum;
}


// ---------------- Rollback -----------------

invalidateBlock(blockid) {
    data = redis.hget("blocks", blockid);

    pipe = redis.pipeline();

    foreach(tx in data.tx) {
        invalidateTransaction(pipe, tx);
    }

    pipe.hdel('blocks', blockid);

    pipe.zremrangebyscore('nblocks', data.height, data.height);

    pipe.execute();

}

invalidateTransaction(pipe, txid) {
    data = redis.hget("transactions", txid);
    foreach(vin in data.vin) {
        invalidateAddressTx(pipe, vin.address, txid);
    }
    foreach(vout in data.vout) {
        address = vout.scriptPubKey.addresses[0];
        invalidateAddressTx(pipe, address, txid);
    }

    pipe.hdel("transactions", txid);
}

invalidateAddressTx(pipe, address, txid) {
    pipe.hdel(address, txid);
}

// --------------- RPC client for blockchain ----------------


// --------------- WS client for block notifications ----------------

wsCallback() {
    // New block arrived
    getBlockRecursive(blockid);
}


// -------------------------------------------
// -------------------------------------------
// -------------------------------------------

// HTTP server for external calls

getLastBlocks() {
    blockcount = redis.zcard("nblocks");
    data = redis.zrange("nblocks", blockcount - 10 - 1, blockcount - 1, 'withscores'); // Get top 10
    foreach(item in data) {
        // Group by pairs  -  blockid, height and send pairs to client
    }

}

getBlock(blockid) {
    data = redis.hget("blocks", blockid);
    // Send to client
}

getTransaction(txid) {
    data = redis.hget("transactions", txid);
    // Send to client
}

getAddressBalance(address) {
    sum = getAddressSum(address);
    // Send to client
}

getAddressGetTransactions(address) {
    data = redis.hgetall(address);
    // Send to client
}






// -------------------------------------------