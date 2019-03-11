import redis
import json

# open a connection to Redis
r = redis.Redis(host='127.0.0.1',port=6379)

'''

r.set('foo', 'bar')
value = r.get('foo')

images= [{'type':'big1', 'url':'1....'},
     {'type':'big2', 'url':'2....'},
     {'type':'big3', 'url':'3....'}] 

r.hset('photo', 'images', json.dumps(images))

i = json.loads(r.hget('photo', 'images'))

for o in i:   
    print(o)
'''
# -------------------------  zset functions  ----------------------------------
'''
blockcount = r.zcard("nblocks")

if blockcount == 0:
    r.zincrby('nblocks', 1, 'blockid1')
    r.zincrby('nblocks', 2, 'blockid2')

    pipe = r.pipeline()
    pipe.zincrby('nblocks', 3, 'blockid3')
    pipe.zincrby('nblocks', 4, 'blockid4')
    pipe.zincrby('nblocks', 5, 'blockid5')
    pipe.zincrby('nblocks', 6, 'blockid6')
    pipe.execute()

    r.zremrangebyscore('nblocks', 6, 6)

blockcount = r.zcard("nblocks")

data = r.zrange("nblocks",blockcount-3,blockcount-1,False,True)  # Get top 3
for o in reversed(data):   
    print(o[0].decode()+' '+str(int(o[1])))

'''
# -------------------------  hset functions  ----------------------------------
