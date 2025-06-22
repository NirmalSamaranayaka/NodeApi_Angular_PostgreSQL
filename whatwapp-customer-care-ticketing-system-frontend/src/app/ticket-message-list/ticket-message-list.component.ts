import { Component, Input } from '@angular/core';
import { Message } from '../api/Message';

@Component({
  selector: 'app-ticket-message-list',
  templateUrl: './ticket-message-list.component.html',
  styleUrls: ['./ticket-message-list.component.scss']
})
export class TicketMessageListComponent {
  @Input() messages: Message[] = [];

  trackByItems(index: number, item: Message): number {
    return item.id;
  }
}
