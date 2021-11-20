import { CacheManager } from '@midwayjs/cache';
import { getCurrentApplicationContext } from '@midwayjs/core';
import { RedisService } from '@midwayjs/redis';

const DeleteKeyMap = new Map<string | number, Set<string>>();

export interface CacheOption {
  ttl?: number;
  deleteKeyIndex?: number;
  deleteKey?: number | string;
}

export interface CacheDeleteOption {
  deleteKeyIndex?: number;
  deleteKey?: number | string;
}

export function CacheResult(namespace: string, option?: CacheOption) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalFunc = descriptor.value;
    const method = propertyKey;
    descriptor.value = async function (...arg) {
      const cacheManager = await getCurrentApplicationContext().getAsync<CacheManager>(CacheManager);
      const cacheK = cacheKey(namespace, method, arg);
      const cachedValue = await cacheManager.get(cacheK);
      const ttl = option && option.ttl ? option.ttl : 600;
      if (cachedValue !== undefined) {
        // await cacheManager.set(cacheK, cachedValue, { ttl: ttl }); //刷新TTL
        // console.log(`refresh cache: key=${cacheK}`);
        return cachedValue;
      }
      const realValue = await originalFunc.apply(this, arg);

      if (realValue !== undefined) {
        await cacheManager.set(cacheK, realValue, { ttl: ttl }); //存入缓存
        // console.log(`set cache: key=${cacheK}`);
        let deleteKey;
        if (option) {
          if (option.deleteKey) {
            deleteKey = option.deleteKey;
          } else if (option.deleteKeyIndex) {
            if (arg.length > option.deleteKeyIndex) {
              deleteKey = arg[option.deleteKeyIndex] as number | string | (number | string)[];
            }
          }
        } else {
          if (arg.length > 0) {
            deleteKey = arg[0] as number | string | (number | string)[];
          }
        }
        if (deleteKey === undefined) {
          deleteKey = '';
        }
        addCacheKeyByDeleteKeys(namespace, deleteKey, cacheK);
      }
      return realValue;
    };
  };
}

export function CleanCacheResults(namespace: string, deleteOption?: CacheDeleteOption) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalFunc = descriptor.value;
    descriptor.value = async function (...arg) {
      const value = await originalFunc.apply(this, arg);
      let deleteKey;
      if (deleteOption) {
        if (deleteOption.deleteKey) {
          deleteKey = deleteOption.deleteKey;
        } else if (deleteOption.deleteKeyIndex) {
          if (arg.length > deleteOption.deleteKeyIndex) {
            deleteKey = arg[deleteOption.deleteKeyIndex] as number | string | (number | string)[];
          }
        }
      } else {
        if (arg.length > 0) {
          deleteKey = arg[0] as number | string | (number | string)[];
        }
      }
      if (deleteKey === undefined) {
        deleteKey = '';
      }
      await cleanLocalCacheKeys(namespace, deleteKey);
      await broadcastCacheDeleteEvent(namespace, deleteKey);
      return value;
    };
  };
}

export async function deleteCacheKeys(namespace: string, deleteKeys: string | number | (string | number)[]) {
  await cleanLocalCacheKeys(namespace, deleteKeys);
  await broadcastCacheDeleteEvent(namespace, deleteKeys);
}

/**
 * 广播缓存清除事件到redis
 * @param deleteKeys 清除key
 */
async function broadcastCacheDeleteEvent(namespace: string, deleteKeys: string | number | (string | number)[]) {
  const redisService = await getCurrentApplicationContext().getAsync<RedisService>(RedisService);
  const obj = { namespace: namespace, deleteKeys: deleteKeys };
  await redisService.publish('cache-delete', JSON.stringify(obj));
}

function addCacheKeyByDeleteKeys(
  namespace: string,
  deleteKeys: string | number | (string | number)[],
  cacheKey: string
) {
  if (typeof deleteKeys === 'string' || typeof deleteKeys === 'number') {
    addCacheKeyByDeleteKey(namespace, deleteKeys, cacheKey);
  } else {
    for (const key of deleteKeys) {
      addCacheKeyByDeleteKey(namespace, key, cacheKey);
    }
  }
}

export async function cleanLocalCacheKeys(namespace: string, deleteKeys: string | number | (string | number)[]) {
  let set: Set<string>;
  if (typeof deleteKeys === 'string' || typeof deleteKeys === 'number') {
    set = DeleteKeyMap.get(namespace + ':' + deleteKeys);
    DeleteKeyMap.delete(namespace + ':' + deleteKeys);
  } else {
    set = new Set<string>();
    for (const key of deleteKeys) {
      const subSet = DeleteKeyMap.get(namespace + ':' + key);
      DeleteKeyMap.delete(namespace + ':' + key);
      if (subSet) {
        subSet.forEach(i => set.add(i));
      }
    }
  }
  if (set) {
    const cacheManager = await getCurrentApplicationContext().getAsync<CacheManager>(CacheManager);
    for (const k of set) {
      await cacheManager.del(k);
      console.log(`delete cache: ${k}`);
    }
  }
}

function addCacheKeyByDeleteKey(namespace: string, deleteKey: string | number, cacheKey: string) {
  let set = DeleteKeyMap.get(namespace + ':' + deleteKey);
  if (!set) {
    set = new Set<string>();
    DeleteKeyMap.set(namespace + ':' + deleteKey, set);
  }
  set.add(cacheKey);
}

export function cacheKey(namespace: string, method?: string, args?: any[]) {
  const argsStr = JSON.stringify(args);
  const key = `${namespace}.${method}:${argsStr}`;
  return key;
}

export async function resetAllCache() {
  const cacheManager = await getCurrentApplicationContext().getAsync<CacheManager>(CacheManager);
  await cacheManager.reset();
}
