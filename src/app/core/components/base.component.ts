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

  convertValueToCharOfGender(value: string) {
    let result: string = '';
    switch (value) {
      case 'Female':
        result = 'F'
        break;
      case 'Male':
        result = 'M'
        break;
      case 'Unknow':
        result = 'U'
        break;
    }
    return result;
  }
}
