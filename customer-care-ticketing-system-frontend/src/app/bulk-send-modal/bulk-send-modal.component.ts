

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BulkSendService } from '../api/bulk-send.service';

@Component({
  selector: 'app-bulk-send-modal',
  templateUrl: './bulk-send-modal.component.html',
  styleUrls: ['./bulk-send-modal.component.scss']
})
export class BulkSendModalComponent {
  message = '';
  sending = false;
  error = '';

  constructor(
    public dialogRef: MatDialogRef<BulkSendModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { selectedTicketIds: number[] },
    private bulkSendService: BulkSendService
  ) {}

  send() {
    if (!this.message.trim()) {
      this.error = 'Message is required';
      return;
    }
    this.sending = true;
    this.bulkSendService.createBulkSend(this.data.selectedTicketIds, this.message)
      .subscribe({
        next: job => {
          this.sending = false;
          this.dialogRef.close(job);
        },
        error: err => {
          this.sending = false;
          this.error = 'Failed to send bulk message';
        }
      });
  }

  close() {
    this.dialogRef.close();
  }
} 

