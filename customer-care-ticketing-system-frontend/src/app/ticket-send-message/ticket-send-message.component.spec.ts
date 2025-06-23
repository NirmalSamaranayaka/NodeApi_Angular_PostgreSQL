import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketSendMessageComponent } from './ticket-send-message.component';

describe('TicketSendMessageComponent', () => {
  let component: TicketSendMessageComponent;
  let fixture: ComponentFixture<TicketSendMessageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TicketSendMessageComponent]
    });
    fixture = TestBed.createComponent(TicketSendMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
