import { Component, OnInit, OnDestroy } from '@angular/core';
import { WebsocketService } from '../websocket.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-websocket',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './websocket.component.html',
  styleUrls: ['./websocket.component.css'],
})
export class WebsocketComponent implements OnInit, OnDestroy {
  messages: string[] = [];
  isRequestInProgress: boolean = false;

  constructor(private websocketService: WebsocketService) {}

  ngOnInit(): void {
    this.websocketService.getResponses().subscribe({
      next: (message) => {
        if (message.type && message.speed) {
          this.messages.push(`${message.type.toUpperCase()}: ${message.speed}`);

          this.isRequestInProgress = false;
        } else if (message.error) {
          this.messages.push(`Error: ${message.error}`);
          this.websocketService.disconnect();
          this.isRequestInProgress = false;
        }
      },
      error: (err) => {
        console.error('WebSocket error:', err);
        this.websocketService.disconnect();
        this.isRequestInProgress = false;
      },
    });
  }

  requestUploadSpeed() {
    console.log('Requesting upload speed...');
    if (this.isRequestInProgress) return;
    this.isRequestInProgress = true;
    this.websocketService.requestSpeed('upload');
  }

  requestDownloadSpeed() {
    console.log('Requesting download speed...');
    if (this.isRequestInProgress) return;
    this.isRequestInProgress = true;
    this.websocketService.requestSpeed('download');
  }

  ngOnDestroy(): void {
    this.websocketService.disconnect();
  }
}
