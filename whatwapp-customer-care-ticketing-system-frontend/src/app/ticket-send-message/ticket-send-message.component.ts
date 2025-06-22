import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-ticket-send-message',
  templateUrl: './ticket-send-message.component.html',
  styleUrls: ['./ticket-send-message.component.scss']
})
export class TicketSendMessageComponent {
  @Input() showForm = true;
  @Output() send = new EventEmitter<string>();

  messageForm = this.fb.group({
    text: this.fb.control('', [Validators.required]),
  });

  constructor(private fb: FormBuilder) {}

  sendMessage() {
    const { text } = this.messageForm.value;
    if (text) {
      this.send.emit(text);
      this.messageForm.reset();
    }
  }
}
