import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TicketsService } from '../api/tickets.service';
import { Message, Ticket } from '../api/Message';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss'],
})
export class TicketComponent implements OnChanges {
  @Input() ticketId!: number;
  ticket: Ticket | null = null;
  messages: Message[] = [];
  showForm = true;
  private lastLoadedTicketId: number | null = null;
  constructor(
    private api: TicketsService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['ticketId'] &&
      changes['ticketId'].currentValue !== changes['ticketId'].previousValue &&
      changes['ticketId'].currentValue !== this.lastLoadedTicketId
    ) {
      this.lastLoadedTicketId = changes['ticketId'].currentValue;
      this.loadTicketData();
    }
  }
  private loadTicketData() {
    this.api.getTicket(this.ticketId).subscribe(
      (ticket) => {
        this.ticket = ticket;
        this.showForm = ticket.status !== 'resolved';
        this.api.getTicketMessages(this.ticketId).subscribe((messages) => {
          this.messages = messages;
        });
      },
      (err) => {
        this.router.navigate(['home', 'tickets', 'not-found']);
      }
    );
  }
  onResolve(ticketId: number) {
    this.api.resolveTicket(ticketId).subscribe(() => {
      this.loadTicketData();
      this.snackBar.open('Ticket resolved', 'Close', { duration: 3000 });
    });
  }
  onSendMessage(text: string) {
    const senderType = 'operator',
      senderId = 'operator1';
    this.api
      .addMessageToTicket(this.ticketId, { text, senderType, senderId })
      .subscribe(() => {
        this.loadTicketData();
        this.snackBar.open('Message sent', 'Close', { duration: 3000 });
      });
  }
}
