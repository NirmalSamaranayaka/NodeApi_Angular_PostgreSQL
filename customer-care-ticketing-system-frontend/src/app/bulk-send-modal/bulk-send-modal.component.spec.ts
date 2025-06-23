import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkSendModalComponent } from './bulk-send-modal.component';

describe('BulkSendModalComponent', () => {
  let component: BulkSendModalComponent;
  let fixture: ComponentFixture<BulkSendModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BulkSendModalComponent]
    });
    fixture = TestBed.createComponent(BulkSendModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
