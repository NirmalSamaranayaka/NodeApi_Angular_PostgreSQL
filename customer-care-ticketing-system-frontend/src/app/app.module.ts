import { importProvidersFrom, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TicketsListComponent } from './tickets-list/tickets-list.component';
import { TicketComponent } from './ticket/ticket.component';
import { TicketsService } from './api/tickets.service';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule } from "@angular/material/list";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSelectModule } from "@angular/material/select";
import { MatDialogModule } from "@angular/material/dialog";
import { MatTableModule } from "@angular/material/table";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { TicketNotFoundComponent } from './ticket-not-found/ticket-not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TicketHeaderComponent } from './ticket-header/ticket-header.component';
import { TicketMessageListComponent } from './ticket-message-list/ticket-message-list.component';
import { TicketSendMessageComponent } from './ticket-send-message/ticket-send-message.component';
import { MatDividerModule } from '@angular/material/divider';
import { BulkSendHistoryComponent } from './bulk-send-history/bulk-send-history.component';
import { BulkSendModalComponent } from './bulk-send-modal/bulk-send-modal.component';
import { BulkSendProgressComponent } from './bulk-send-progress/bulk-send-progress.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TicketsListComponent,
    TicketComponent,
    TicketNotFoundComponent,
    TicketHeaderComponent,
    TicketMessageListComponent,
    TicketSendMessageComponent,
    BulkSendHistoryComponent,
    BulkSendModalComponent,
    BulkSendProgressComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatListModule,
    MatToolbarModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDialogModule,
    MatTableModule,
    MatDividerModule
  ],
  providers: [
    importProvidersFrom(HttpClientModule),
    TicketsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
