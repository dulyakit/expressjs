import Redis from 'ioredis'
import apicache from 'apicache-plus'

const cacheWithRedis = apicache.options({
    // redisClient: new Redis('redis-12609.c295.ap-southeast-1-1.ec2.cloud.redislabs.com:12609'),
    redisClient: new Redis('redis://:5FXcTt3z6isUw7SLq4hVSbnzFaa6ANCz@redis-12609.c295.ap-southeast-1-1.ec2.cloud.redislabs.com:12609'),
})

export {
    cacheWithRedis,
}