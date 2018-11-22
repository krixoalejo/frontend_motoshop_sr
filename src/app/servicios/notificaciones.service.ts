import { Injectable } from '@angular/core';
import { NgxNotificationService } from 'ngx-notification';

@Injectable()
export class NotificacionesServicio{

    constructor(
        private ngxNotificationService: NgxNotificationService,
    ){}

    public notificationSuccess( text ) {
        this.ngxNotificationService.sendMessage( text, 'success', 'top-right');
    }

    public notificationWarning( text ) {
        this.ngxNotificationService.sendMessage( text, 'warning', 'top-right');
    }

    public notificationDanger( text ) {
        this.ngxNotificationService.sendMessage( text, 'danger', 'top-right');
    }
}