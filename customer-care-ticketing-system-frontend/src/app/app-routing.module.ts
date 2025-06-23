import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { HomeComponent } from './home/home.component';
import { TicketComponent } from './ticket/ticket.component';
import { TicketNotFoundComponent } from './ticket-not-found/ticket-not-found.component';
import { BulkSendHistoryComponent } from './bulk-send-history/bulk-send-history.component';

const routes: Routes = [
  {
    path: 'home', component: HomeComponent, children: [
      { path: 'tickets/not-found', component: TicketNotFoundComponent },
      { path: 'tickets/:ticketId', component: TicketComponent },
      { path: 'bulk-send-history', component: BulkSendHistoryComponent },
    ]
  },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { bindToComponentInputs: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
