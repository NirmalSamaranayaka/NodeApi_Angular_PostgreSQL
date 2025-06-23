import { Component, OnInit } from '@angular/core';
import { BulkSendService, BulkSendJob } from '../api/bulk-send.service';
import { MatDialog } from '@angular/material/dialog';
import { BulkSendProgressComponent } from '../bulk-send-progress/bulk-send-progress.component';
import { interval, Subscription, switchMap } from 'rxjs';

@Component({
  selector: 'app-bulk-send-history',
  templateUrl: './bulk-send-history.component.html',
  styleUrls: ['./bulk-send-history.component.scss'],
})
export class BulkSendHistoryComponent implements OnInit {
  jobs: BulkSendJob[] = [];
  loading = true;
  pollingSub: Subscription | null = null;

  constructor(
    private bulkSendService: BulkSendService,
    private dialog: MatDialog
  ) {}

  // If this way need to reloard data manually to see final status in table
  // ngOnInit() {
  //   this.bulkSendService.getBulkSendJobs().subscribe((jobs) => {
  //     this.jobs = jobs;
  //     this.loading = false;
  //   });
  // }

  ngOnInit() {
    this.loadJobs(); // initial load
    // Start polling every 5 seconds
    this.pollingSub = interval(5000)
      .pipe(switchMap(() => this.bulkSendService.getBulkSendJobs()))
      .subscribe((jobs) => {
        this.jobs = jobs;
        this.loading = false;
      });
  }

  ngOnDestroy(): void {
    this.pollingSub?.unsubscribe(); //  stop polling when component destroyed
  }

  loadJobs() {
    this.bulkSendService.getBulkSendJobs().subscribe((jobs) => {
      this.jobs = jobs;
      this.loading = false;
    });
  }
  viewJob(job: BulkSendJob) {
    this.dialog.open(BulkSendProgressComponent, { data: { jobId: job.id } });
  }

}
