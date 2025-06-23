import { Component, Input, OnInit } from '@angular/core';
import { TicketsService } from '../api/tickets.service';
import { Ticket } from '../api/Message';
import { concat, map, Observable, race, switchMap } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BulkSendModalComponent } from '../bulk-send-modal/bulk-send-modal.component';
import { BulkSendProgressComponent } from '../bulk-send-progress/bulk-send-progress.component';

type ItemList = Ticket & {};
@Component({
  selector: 'app-tickets-list',
  templateUrl: './tickets-list.component.html',
  styleUrls: ['./tickets-list.component.scss'],
})
export class TicketsListComponent implements OnInit {
  tickets = new Observable<ItemList[]>();
  filterStatus = this.fb.control<'all' | 'resolved' | 'unresolved'>('all');
  selectedTicketIds: number[] = [];
  selectAllChecked = false;
  constructor(
    private api: TicketsService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.tickets = concat(
      this.api.getTickets(),
      this.filterStatus.valueChanges.pipe(
        map((value) => {
          if (!value || value === 'all') return undefined;
          return value;
        }),
        switchMap((status) => this.api.getTickets(status))
      )
    );
  }
  onSelectTicket(ticketId: number, checked: boolean) {
    if (checked) {
      if (!this.selectedTicketIds.includes(ticketId)) {
        this.selectedTicketIds.push(ticketId);
      }
    } else {
      this.selectedTicketIds = this.selectedTicketIds.filter(
        (id) => id !== ticketId
      );
    }
  }
  onSelectAll(tickets: ItemList[], checked: boolean) {
    if (checked) {
      this.selectedTicketIds = tickets
        .filter((t) => t.status === 'unresolved')
        .map((t) => t.id);
    } else {
      this.selectedTicketIds = [];
    }
    this.selectAllChecked = checked;
  }
  openBulkSendModal() {
    const dialogRef = this.dialog.open(BulkSendModalComponent, {
      data: { selectedTicketIds: this.selectedTicketIds },
    });
    dialogRef.afterClosed().subscribe((job) => {
      this.selectedTicketIds = [];
      this.selectAllChecked = false;
      if (job && job.id) {
        this.dialog.open(BulkSendProgressComponent, {
          data: { jobId: job.id },
        });
      }
    });
  }
}
