import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketMessageListComponent } from './ticket-message-list.component';

describe('TicketMessageListComponent', () => {
  let component: TicketMessageListComponent;
  let fixture: ComponentFixture<TicketMessageListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TicketMessageListComponent]
    });
    fixture = TestBed.createComponent(TicketMessageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
