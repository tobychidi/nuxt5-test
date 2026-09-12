import {
   createStore,
   get,
   set,
   del,
   clear,
   keys,
   values,
   type UseStore,
} from "idb-keyval";

export class AppStore<T = unknown> {
   private readonly _store: UseStore;

   constructor(storeName: string) {
      this._store = createStore("app-store", storeName);
   }

   set(key: IDBValidKey, value: T) {
      return set(key, value, this._store);
   }

   get(key: IDBValidKey) {
      return get<T>(key, this._store);
   }

   delete(key: IDBValidKey) {
      return del(key, this._store);
   }

   clear() {
      return clear(this._store);
   }

   keys() {
      return keys(this._store);
   }

   async has(key: IDBValidKey): Promise<boolean> {
      const val = await get(key, this._store);
      return val !== undefined;
   }
   values() {
      return values(this._store);
   }
}
