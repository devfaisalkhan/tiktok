import { inject, Injectable } from '@angular/core';

import { AppInjector, AppSettingService } from 'ngx-universal-zone';

import { AppConstant } from './app-constant';
import { DbService } from 'ngx-universal-zone/database';
import { SchemaService } from 'ngx-universal-zone/database';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { NgxPubSubService } from './pub-sub';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  protected http: HttpClient;
  protected dbService: DbService;
  protected schemaSvc: SchemaService;
  protected appSettingSvc: AppSettingService;
  protected pubsubSvc: NgxPubSubService;

  constructor() {
    
    this.http = inject(HttpClient);
    this.schemaSvc = inject(SchemaService);
    this.appSettingSvc = inject(AppSettingService);
    this.pubsubSvc = inject(NgxPubSubService);
    this.dbService = inject(DbService);
  }

  protected getData<T>(
    url: string,
    body?: any,
    errorHandler?: any
  ): Promise<T> {
    return new Promise(async (resolve, reject) => {
      let headers: any = await this.prepareHeaders();
      body = body || {};

      url = `${AppConstant.BASE_API_URL + url}`;
      for (let prop in body) {
        if (body.hasOwnProperty(prop) && body[prop]) {
          if (url.includes('?')) {
            url += '&';
          } else {
            url += '?';
          }
          url += `${prop}=${body[prop]}`;
        }
      }
      const request = this.http.get<ApiResponse>(url, {
        headers: headers,
      });
      request.subscribe(
        (result) => {
          resolve(<T>result);
        },
        async (error) => {
          // await this.handleError(error, errorHandler, request, resolve, reject);
        }
      );
    });
  }

  protected postData<T>(args: HttpParams): Promise<T> {
    return new Promise(async (resolve, reject) => {
      let headers: HttpHeaders = await this.prepareHeaders(args);

      let newUrl;
      if (!args.overrideUrl) {
        newUrl = `${AppConstant.BASE_API_URL + args.url}`;
      } else {
        newUrl = args.url;
      }

      args.url = newUrl;

      //add to queue
      let body = args.body;
      this.http
        .post<ApiResponse>(args.url, body, {
          headers: headers,
        })
        .subscribe(
          (result) => {
            resolve(<T>result);
          },
          (error) => {
            this.handleError(error, args);
            if (args.errorCallback) {
              resolve(null as any);
            } else {
              reject(error);
            }
          }
        );
    });
  }

  protected async handleError(e: HttpErrorResponse, args: HttpParams) {
    if (AppConstant.DEBUG) {
      console.log('BaseService: handleError', e);
    }
    switch (e.status) {
      // case 401:
      //     const u = await this.userSettingSvc.getCurrentUser();
      //     if(u) {
      //         //TODO: check for token expiration...
      //         //kickout...
      //         this.pubsubSvc.publishEvent(UserConstant.EVENT_USER_LOGGEDOUT, { clearCache: true, displayLoginDialog: true });
      //     }
      // break;
      default:
        if (!args.errorCallback) {
          let msg;
          //the error might be thrown by e.g a plugin wasn't install properly. In that case text() will not be available
          if (e.message) {
            msg = e.message;
          } else {
            msg = e.error.toString();
          }
          // setTimeout(async () => {
          //     await this.helperSvc.alert(msg);
          // });
        } else {
          args.errorCallback(e, args);
        }
        break;
    }
  }

  // private async prepareHeaders(args: HttpParams) {
  //   let headers = new HttpHeaders();
  //   if (!args.ignoreContentType) {
  //     headers = headers.append(
  //       'Content-Type',
  //       'application/json;charset=utf-8'
  //     );
  //   }

  //   // const token = await this.userSettingSvc.getAccessToken();
  //   // if(token) {
  //   //     headers = headers.append('Authorization', `Bearer ${token}`);
  //   // }

  //   // if (args.httpHeaders) {
  //   //   args.httpHeaders.keys().forEach((k) => {
  //   //     headers = headers.append(k, args.httpHeaders.get(k) as any);
  //   //   });
  //   // }
  //   return headers;
  // }

  async prepareHeaders(ignoreContentType?: any) {
    // let headers = new HttpHeaders();
    // if (!ignoreContentType) {
    //   headers = headers.append(
    //     'Content-Type',
    //     'application/json;charset=utf-8'
    //   );
    // }
    // let ce = await this.customerSettingSvc.getCurrentCustomerEmail();
    // if (ce) {
    //   if (ce.includes('@')) {
    //     //its an email and user is loggedin
    //     headers = headers.append('email', ce);
    //   } else {
    //     //its a guest
    //     headers = headers.append('token', ce);
    //   }
    // }
    // let cp = await this.customerSettingSvc.getCurrentCustomerPassword();
    // if (cp) {
    //   headers = headers.append('password', cp);
    // }
    // let workingLanguage = await this.languageSettingSvc.getWorkingLanguage();
    // if (workingLanguage) {
    //   headers = headers.append('workingLanguage', workingLanguage);
    // }
    // return headers;
    return '' as any
  }
}

export class HttpParams {
  url: any;
  body?: any;
  errorCallback?: any;
  ignoreContentType?: boolean;
  overrideUrl?: boolean;
  httpHeaders?: HttpHeaders;
}

export interface ApiResponse {
  statusCode: number;
  message: any;
  data: any;
  exception: any;
}
