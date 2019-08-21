export interface CacheService {
  setItem<T = any>(key: string, item: T, ttlInMinutes: number): void;
  getItem<T = any>(key: string): T | null;
  removeItem<T = any>(key: string): T | null;
  clear(): number;
}
