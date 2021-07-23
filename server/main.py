import json
from redis import Redis


class RPC():
    def __init__(self):
        pass

    def get_blockchain_info(self):
        pass

    def get_block_hash(self):
        pass

    def get_block(self):
        pass

    def get_transaction(self, txid):
        pass


class Core():
    genesis_block_id = ""

    def __init__(self, rpc, redis):
        self.rpc = rpc
        self.redis = redis

    def synchronize(self):
        data = self.rpc.getBlockchainInfo()
        blockcount = self.redis.zcard("nblocks")

        # Have more than a half data - start from top
        if (blockcount >= 0 and data['lastblock']['height'] < (blockcount * 2)):
            self.get_block_recursive(data['lastblock']['hash'])
        else:
            # No data or less than a half - start from beginning
            genesis_block_id = self.rpc.get_block_hash(0)
            self.rpc.get_block_recursive(genesis_block_id)

    def get_block_recursive(self, blockid):
        data = self.rpc.get_block(blockid)

        if (blockid == self.genesis_block_id
                or self.redis.hexists("blocks", data['previousblockhash'])) \
                and self.redis.hexists("blocks", blockid):
            # To be sure we delete old block version with same height
            if self.redis.zcount("nblocks", data['height'], data['height']) > 0:
                inv_block = self.redis.zrangebyscore("nblocks", data['height'], data['height'])[0]
                self.invalidate_block(inv_block)

            self.write_block(data)
            if data['nextblockhash']:
                # Go UP
                self.get_block_recursive(data['nextblockhash'])
        else:
            if data['previousblockhash']:
                # Go down
                self.get_block_recursive(data['previousblockhash'])

    def invalidate_block(self, blockid):
        block = json.loads(self.redis.hget('blocks', blockid))

        _pipe = self.redis.pipeline()

        for txid in block['tx']:
            self.invalidate_transaction(_pipe, txid)

        _pipe.hdel('blocks', blockid)
        _pipe.zremrangebyscore('nblocks', block['height'], block['height'])

        _pipe.execute()

    def invalidate_transaction(self, _pipe, txid):
        tx = json.loads(self.redis.hget("transactions", txid))
        for vin in tx['vin']:
            self.invalidate_address_tx(_pipe, vin['address'], txid)

        for vout in tx['vout']:
            address = vout['scriptPubKey']['addresses'][0]
            self.invalidate_address_tx(_pipe, address, txid)

        _pipe.hdel("transactions", txid)

    def invalidate_address_tx(self, _pipe, address, txid):
        _pipe.hdel(address, txid)

    def write_block(self, block):
        _pipe = self.redis.pipeline()

        # Write nblocks zset (height, blockid)
        _pipe.zadd('nblocks', block['height'], block['hash'])

        # Write blocks hset <blockid, {json}>
        _pipe.hset("blocks", block['hash'], json.dumps(block))

        for txid in block['tx']:
            tx = self.rpc.get_transaction(txid)
            self.write_transaction(_pipe, tx)

        _pipe.execute()

    def write_transaction(self, _pipe, tx):
        for vin in tx['vin']:
            address = self.resolve_tx_input(vin['txid'], vin['vout'])
            addressSum = self.get_address_sum(address)

            vin['address'] = address

            _address_tx_value = {
                'sum': addressSum * -1,
                'time': tx['nTime']
            }

            # address hset <txid, (+-summ, time)>
            _pipe.hset(address, tx['txid'], json.dumps(_address_tx_value))

        for vout in tx['vout']:
            if 'scriptPubKey' in vout and \
                    'addresses' in vout['scriptPubKey'] and \
                    len(vout['scriptPubKey']['addresses']) > 0:
                address = vout['scriptPubKey']['addresses'][0]

                _address_tx_value = {
                    'sum': vout['value'],
                    'time': tx['nTime']
                }

                # address hset <txid, (+-summ, time)>
                _pipe.hset(address, tx['txid'], json.dumps(_address_tx_value))

        # transactions hset <txid, {json}>
        _pipe.hset("transactions", tx['txid'], json.dumps(tx))

    def resolve_tx_input(self, txid, vout):
        tx = json.loads(self.redis.hget("transactions", txid))
        address = tx['vout'][vout]['scriptPubKey']['addresses'][0]
        return address

    def get_address_sum(self, address):
        _sum = 0

        # Get all tx from and to address
        for txid in self.redis.hkeys(address):
            _address_tx_value = json.loads(self.redis.hget(address, txid))
            _sum += _address_tx_value['sum']

        return _sum


class Http():
    def __init__(self, rpc, redis):
        self.rpc = rpc
        self.redis = redis

    def start():
        pass


class Socket():
    def __init__(self, core):
        self.core

    def start():
        pass


rpc = RPC()
redis = Redis(host='127.0.0.1', port=6379)

core = Core(rpc, redis)
http = Http(rpc, redis)
socket = Socket(core)

# Synchronize with blockchain
core.synchronize()

# Start HTTP server
http.start()

# Start WebSocket client for notifications
socket.start()
