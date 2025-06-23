import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkSendProgressComponent } from './bulk-send-progress.component';

describe('BulkSendProgressComponent', () => {
  let component: BulkSendProgressComponent;
  let fixture: ComponentFixture<BulkSendProgressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BulkSendProgressComponent]
    });
    fixture = TestBed.createComponent(BulkSendProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
