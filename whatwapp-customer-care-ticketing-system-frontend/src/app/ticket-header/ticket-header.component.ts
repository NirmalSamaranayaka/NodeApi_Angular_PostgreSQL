import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Ticket } from '../api/Message';

@Component({
  selector: 'app-ticket-header',
  templateUrl: './ticket-header.component.html',
  styleUrls: ['./ticket-header.component.scss'],
})
export class TicketHeaderComponent {
  @Input() ticket!: Ticket | null;
  @Output() resolve = new EventEmitter<number>();
}