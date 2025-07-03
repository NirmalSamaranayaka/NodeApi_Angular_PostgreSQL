import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TicketsService } from '../api/tickets.service';
import { Message, Ticket } from '../api/Message';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, Observable, of } from 'rxjs';
import { switchMap, tap, catchError, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss'],
})
export class TicketComponent implements OnInit, OnDestroy {
  // Holds the current ticket ID and emits new values when it changes
  private ticketIdSubject = new BehaviorSubject<number | null>(null);
  // Used to signal component destruction for unsubscribing from observables
  private destroy$ = new Subject<void>();
  // Controls the visibility of the message form (hidden if ticket is resolved)
  showForm = true;

  constructor(
    private api: TicketsService, // Service for ticket-related API calls
    private snackBar: MatSnackBar, // For showing notifications
    private router: Router // For navigation (e.g., to not-found page)
  ) {}

  ngOnInit(): void {}

  /**
   * Observable emitting the current ticket details.
   * - Fetches ticket data whenever ticketId changes.
   * - Navigates to not-found page if ticket is not found.
   * - Updates showForm based on ticket status.
   */
  ticket$: Observable<Ticket | null> = this.ticketIdSubject.pipe(
    switchMap((ticketId) => {
      if (ticketId === null) return of(null); // No ticket selected
      return this.api.getTicket(ticketId).pipe(
        catchError((err) => {
          // Navigate to not-found page if ticket doesn't exist
          this.router.navigate(['home', 'tickets', 'not-found']);
          return of(null);
        })
      );
    }),
    tap((ticket) => {
      // Show form only if ticket exists and is not resolved
      this.showForm = !!ticket && ticket.status !== 'resolved';
    })
  );

  /**
   * Observable emitting the list of messages for the current ticket.
   * - Fetches messages whenever ticketId changes.
   * - Returns an empty array if ticketId is null or on error.
   */
  messages$: Observable<Message[]> = this.ticketIdSubject.pipe(
    switchMap((ticketId) => {
      if (ticketId === null) return of([]); // No ticket selected
      return this.api
        .getTicketMessages(ticketId)
        .pipe(catchError(() => of([]))); // Return empty array on error
    })
  );

  /**
   * Input property for setting the ticket ID from a parent component.
   * Triggers data reloads when changed.
   */
  @Input()
  set ticketId(value: number) {
    this.ticketIdSubject.next(value);
  }
  get ticketId(): number | null {
    return this.ticketIdSubject.value;
  }

  /**
   * Cleanup logic to prevent memory leaks by completing destroy$ subject.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Resolves the current ticket by calling the API.
   * - On success, refreshes ticket data and shows a notification.
   * - Uses takeUntil to unsubscribe on component destroy.
   */
  onResolve(ticketId: number) {
    this.api
      .resolveTicket(ticketId)
      .pipe(
        tap(() => {
          // Refresh ticket data and show notification
          this.ticketIdSubject.next(ticketId);
          this.snackBar.open('Ticket resolved', 'Close', { duration: 3000 });
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  /**
   * Sends a new message to the current ticket.
   * - On success, refreshes ticket data and shows a notification.
   * - Uses takeUntil to unsubscribe on component destroy.
   */
  onSendMessage(text: string) {
    const senderType = 'operator',
      senderId = 'operator1';
    if (!this.ticketId) return;
    this.api
      .addMessageToTicket(this.ticketId, { text, senderType, senderId })
      .pipe(
        tap(() => {
          // Refresh ticket data and show notification
          this.ticketIdSubject.next(this.ticketId!);
          this.snackBar.open('Message sent', 'Close', { duration: 3000 });
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }
}
