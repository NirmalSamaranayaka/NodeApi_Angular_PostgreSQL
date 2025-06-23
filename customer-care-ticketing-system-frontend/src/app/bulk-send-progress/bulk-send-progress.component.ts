import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BulkSendService, BulkSendJob } from '../api/bulk-send.service';
import { Subscription, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-bulk-send-progress',
  templateUrl: './bulk-send-progress.component.html',
  styleUrls: ['./bulk-send-progress.component.scss'],
})
export class BulkSendProgressComponent implements OnInit, OnDestroy {
  job: BulkSendJob | null = null;
  pollingSub: Subscription | null = null;
  error = '';

  constructor(
    public dialogRef: MatDialogRef<BulkSendProgressComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { jobId: number },
    private bulkSendService: BulkSendService
  ) {}

  ngOnInit() {
    //poll every 1 second and unsubscribe when done
    this.pollingSub = interval(1000)
      .pipe(
        switchMap(() =>
          this.bulkSendService.getBulkSendJob(this.data.jobId)
        )
      )
      .subscribe({
        next: (job : BulkSendJob) => {
          // defensively normalize undefined values to prevent NaN or missing UI
          this.job = {
            ...job,
            succeededCount: job.succeededCount ?? 0,
            failedCount: job.failedCount ?? 0,
            totalCount: job.totalCount ?? 0,
            ticketIds: job.ticketIds ?? [],
            results: job.results ?? {},
          };

          if (job.status === 'completed') {
            this.pollingSub?.unsubscribe(); //stop polling once complete
          }
        },
        error: () => {
          this.error = 'Failed to fetch job status';
        },
      });
  }

  ngOnDestroy() {
    this.pollingSub?.unsubscribe(); //ensure cleanup
  }

  close() {
    this.dialogRef.close();
  }
}
