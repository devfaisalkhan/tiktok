import { Injectable } from '@angular/core';
import { AppSettingService } from 'ngx-universal-zone';
import { BaseService } from '../../universal/base.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {

  constructor() {
    super();
  }

  authenticate(user: any) {
    return this.postData({
      url: `auth/authenticate`,
      body: {
        ...user
      }
    })
  }
}
