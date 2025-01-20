import { Component } from '@angular/core';
import { WebsocketComponent } from './websocket/websocket.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [WebsocketComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'websocket-project';
}
