import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class GenericSessionService {

    constructor() { }

    public save(storageKey, value) {
        const json = JSON.stringify(value);
        sessionStorage.setItem(storageKey, json);
    }

    public remove(storageKey) {
        sessionStorage.removeItem(storageKey);
    }

    public get(storageKey): any {
        const item = sessionStorage.getItem(storageKey);
        let parsed = null;
        if (item !== undefined && item != null) {
            parsed = JSON.parse(item);
        }
        return parsed;
    }
}
