import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private socket$: WebSocketSubject<any>;

  constructor() {
    this.socket$ = webSocket('ws://localhost:8080');
  }

  requestSpeed(type: 'upload' | 'download') {
    this.socket$.next({ type });
  }

  getResponses() {
    return this.socket$;
  }

  disconnect() {
    this.socket$.complete();
  }
}
