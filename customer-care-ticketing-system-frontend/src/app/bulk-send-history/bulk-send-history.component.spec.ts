import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkSendHistoryComponent } from './bulk-send-history.component';

describe('BulkSendHistoryComponent', () => {
  let component: BulkSendHistoryComponent;
  let fixture: ComponentFixture<BulkSendHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BulkSendHistoryComponent]
    });
    fixture = TestBed.createComponent(BulkSendHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
