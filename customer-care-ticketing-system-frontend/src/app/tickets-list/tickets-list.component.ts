import { Component, Input, OnInit } from '@angular/core';
import { TicketsService } from '../api/tickets.service';
import { Ticket } from '../api/Message';
import { concat, map, Observable, race, switchMap } from 'rxjs';
import { FormBuilder } from '@angular/forms';

type ItemList = Ticket & {}

@Component({
  selector: 'app-tickets-list',
  templateUrl: './tickets-list.component.html',
  styleUrls: ['./tickets-list.component.scss']
})
export class TicketsListComponent implements OnInit {

  tickets = new Observable<ItemList[]>();
  filterStatus = this.fb.control<"all" | "resolved" | "unresolved">("all");

  constructor(
    private api: TicketsService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.tickets = concat(
      this.api.getTickets(),
      this.filterStatus.valueChanges.pipe(
        map(value => {
          if (!value || value === "all") return undefined;
          return value;
        }),
        switchMap(status => this.api.getTickets(status))
      )
    );
  }

}
