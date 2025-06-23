import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface BulkSendJob {
  id: number;
  message: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  succeededCount: number;
  failedCount: number;
  totalCount: number;
  ticketIds: number[];
  results: Record<number, 'succeeded' | 'failed'>;
}

@Injectable({ providedIn: 'root' })
export class BulkSendService {
  private baseUrl = 'http://localhost:8000/api/v1';

  constructor(private http: HttpClient) {}

  createBulkSend(
    ticketIds: number[],
    message: string
  ): Observable<BulkSendJob> {
    return this.http.post<BulkSendJob>(`${this.baseUrl}/bulk-send`, {
      ticketIds,
      message,
    });
  }

  getBulkSendJob(jobId: number): Observable<BulkSendJob> {
    return this.http.get<BulkSendJob>(
      `${this.baseUrl}/bulk-send/jobs/${jobId}`
    );
  }

  getBulkSendJobs(): Observable<BulkSendJob[]> {
    return this.http.get<BulkSendJob[]>(`${this.baseUrl}/bulk-send/jobs`);
  }
}
