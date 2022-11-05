import { Injectable, Injector } from '@angular/core';
import * as moment from 'moment';
import { AlertMessageService } from '../services/alert-message.service';
import { LoadingService } from '../services/loading.service';

@Injectable()
export abstract class BaseComponent {
  protected alertMessageService: AlertMessageService;
  protected loaderService: LoadingService;

  protected constructor(injector: Injector) {
    this.alertMessageService = injector.get(AlertMessageService);
    this.loaderService = injector.get(LoadingService);
  }

  showLoader(isLoading: boolean = true) {
    if (isLoading) {
      this.loaderService.show();
    }
    else {
      this.loaderService.hide();
    }
  }

  formatDate(dayOfbirth?: Date) {
    let date = '';
    if (dayOfbirth) {
      date = moment(new Date(dayOfbirth)).format("YYYY-MM-DD");
    }
    return date;
  }
}
