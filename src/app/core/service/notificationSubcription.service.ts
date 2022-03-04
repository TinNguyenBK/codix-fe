import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NotificationSubscriptionService {
  constructor() {}

  private currentMessage = new BehaviorSubject(null);

  setMessage(msg: any) {
    this.currentMessage.next(msg);
  }

  getMessage(): Observable<any> {
    return this.currentMessage.asObservable();
  }
}
