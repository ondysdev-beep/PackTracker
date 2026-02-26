import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

let redis: Redis | null = null;

function getRedis(): Redis {
  if (!redis) {
    redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    });
  }
  return redis;
}

export function createRateLimiter(
  requests: number,
  window: `${number} s` | `${number} m` | `${number} h` | `${number} d`
) {
  return new Ratelimit({
    redis: getRedis(),
    limiter: Ratelimit.slidingWindow(requests, window),
    analytics: true,
  });
}

export const apiRateLimiter = {
  free: () => createRateLimiter(100, "1 h"),
  pro: () => createRateLimiter(10000, "1 h"),
};

export const trackRateLimiter = () => createRateLimiter(30, "1 m");

export async function checkRateLimit(
  limiter: Ratelimit,
  identifier: string
): Promise<{ success: boolean; remaining: number; reset: number }> {
  const result = await limiter.limit(identifier);
  return {
    success: result.success,
    remaining: result.remaining,
    reset: result.reset,
  };
}
