import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-custom-event',
  templateUrl: './custom-event.component.html',
  styleUrls: ['./custom-event.component.css']
})
export class CustomEventComponent {
  @Input() name: string = '';
  @Input() location: string = '';
  @Input() day: string = '';
  @Input() startTime: string = '';
  @Input() endTime: string = '';
  @Input() id: string = '';
  @Input() isInSchedule: boolean = false;

  @Output() addEvent = new EventEmitter<any>();
  @Output() removeEvent = new EventEmitter<any>();

  constructor() {
    // Initialize default values if needed
    this.name = 'Default Event Name';
    this.location = 'Default Location';
    this.day = 'Default Day';
    this.startTime = '00:00';
    this.endTime = '00:00';
    this.id = '0';
  }

  addToSchedule(): void {
    this.isInSchedule = true;
    this.addEvent.emit({
      name: this.name,
      location: this.location,
      day: this.day,
      startTime: this.startTime,
      endTime: this.endTime,
      id: this.id,
      isInSchedule: true
    });
  }

  removeFromSchedule(): void {
    this.isInSchedule = false;
    this.removeEvent.emit({
      name: this.name,
      location: this.location,
      day: this.day,
      startTime: this.startTime,
      endTime: this.endTime,
      id: this.id,
      isInSchedule: false
    });
  }
}