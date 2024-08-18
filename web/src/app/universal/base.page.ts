import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { NgxPubSubService } from './pub-sub';
import { AppInjector, AppSettingService } from 'ngx-universal-zone';


@Component({
  template: 'NO UI TO BE FOUND HERE!',
})
export class BasePage {
  protected router: Router;
  protected pubsubSvc: NgxPubSubService;
  protected appSettingSvc: AppSettingService;

  constructor() {
    const injector = AppInjector.getInjector();

    this.router = injector.get(Router);
    this.pubsubSvc = injector.get(NgxPubSubService);
    this.appSettingSvc = injector.get(AppSettingService);
    this.appSettingSvc = injector.get(AppSettingService);
  }

  async navigate(args: { path: string; params?: any; extras?: NavigationExtras }) {
    if (args.params) {
      await this.router.navigate([args.path, args.params], args.extras);
    } else {
      await this.router.navigate([args.path], args.extras);
    }
  }

  // async navigateToHome(shouldReplaceUrl = true) {
  //   await this.navigate({
  //     path: '/home',
  //     extras: shouldReplaceUrl ? { replaceUrl: shouldReplaceUrl } : null,
  //   });
  // }
}
