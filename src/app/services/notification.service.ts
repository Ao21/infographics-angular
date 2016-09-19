import { Injectable } from '@angular/core';
import * as toastr from 'toastr';

@Injectable()
export class NotificationService {
  toastr = toastr;

  constructor() {
    window['toastr'] = toastr;
  }

  createError = (errmsg) => {
    console.log(errmsg);
    this.toastr.error(errmsg, 'Error!')
  }

}
