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

  formatDate(dayOfbirth?: Date, type: string = "YYYY-MM-DD") {
    let date = '';
    if (dayOfbirth) {
      date = moment(new Date(dayOfbirth)).format(type);
    }
    return date;
  }

  convertChartoValueOfGender(char: string) {
    let result: string = '';
    switch (char) {
      case 'F':
        result = 'Female'
        break;
      case 'M':
        result = 'Male'
        break;
      case 'U':
        result = 'Unknow'
        break;
    }
    return result;
  }

  convertValueToCharOfDuration(value: string) {
    let result: string = '';
    switch (value) {
      case '5 minutes':
        result = '5m'
        break;
      case '10 minutes':
        result = '10m'
        break;
      case '15 minutes':
        result = '15m'
        break;
      case '30 minutes':
        result = '30m'
        break;
      case '1 hours':
        result = '1hours'
        break;
      case 'Until updated':
        result = 'until_update'
        break;
    }
    return result;
  }

  replaceSpace(value: string) {
    return value ? value.replace(/\s/g, '') : '';
  }
}
