import { Injectable } from '@angular/core';
import { StorageKeys } from '../constants/storage-keys.constants';
import { UserModel } from '../models/user.model';
import { GenericStorageService } from './generic-storage.service';

@Injectable({
    providedIn: 'root'
})
export class UserDataService {

    constructor(private storageData: GenericStorageService) { }

    public save(data): void {
      this.storageData.save(StorageKeys.USER_DATA, data);
    }

    public get(): UserModel {
      const user = this.storageData.get(StorageKeys.USER_DATA);
      return user;
    }

    public remove(): void {
        this.storageData.remove(StorageKeys.USER_DATA);
    }
}
