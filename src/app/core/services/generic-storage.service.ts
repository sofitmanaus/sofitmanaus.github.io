import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class GenericStorageService {

    constructor() { }

    public save(storageKey, value) {
        const json = JSON.stringify(value);
        localStorage.setItem(storageKey, json);
    }

    public remove(storageKey) {
        localStorage.removeItem(storageKey);
    }

    public get(storageKey): any {
        const item = localStorage.getItem(storageKey);
        let parsed = null;
        if (item !== undefined && item != null) {
            parsed = JSON.parse(item);
        }
        return parsed;
    }
}
