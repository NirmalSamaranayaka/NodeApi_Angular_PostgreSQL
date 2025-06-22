import { Component, Input, OnInit } from '@angular/core';
import { TicketsService } from '../api/tickets.service';
import { Message, Ticket } from '../api/Message';
import { catchError, Observable, switchMap, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {
  _ticketId = 0;
  ticket$ = new Observable<Ticket>();
  messages$ = new Observable<Message[]>();
  messageForm = this.fb.group({
    text: this.fb.control('', [Validators.required]),
  });

  @Input()
  set ticketId(ticketId: number) {
    this._ticketId = ticketId;
    this.ticket$ = this.api.getTicket(this._ticketId).pipe(
      tap(ticket => {
        if (ticket.status === "resolved") {
          this.messageForm.disable();
        } else {
          this.messageForm.enable();
        }
      })
    );
    this.messages$ = this.ticket$.pipe(
      switchMap(({ id }) => this.api.getTicketMessages(id)),
      catchError((err, caught) => {
        this.router.navigate(["home", "tickets", "not-found"]);
        return caught;
      }),
    )
    this.messageForm.reset();
  }
  get ticketId() {
    return this._ticketId;
  }

  constructor(
    private api: TicketsService,
    private snackBar: MatSnackBar,
    private router: Router,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
  }

  trackByItems(index: number, item: Message): number {
    return item.id;
  }

  closeTicket(ticketId: number) {
    this.api.resolveTicket(ticketId).subscribe(t => {
      this.ticketId = this._ticketId;
      this.snackBar.open("Ticket resolved", "Close", { duration: 3000 });
    });
  }

  sendMessage() {
    const { text } = this.messageForm.value;
    const senderType = "operator", senderId = "operator1";
    this.api.addMessageToTicket(this._ticketId, { text: text!, senderType, senderId }).subscribe(message => {
      this.ticketId = this._ticketId;
      this.snackBar.open("Message sent", "Close", { duration: 3000 });
    });
  }
}
