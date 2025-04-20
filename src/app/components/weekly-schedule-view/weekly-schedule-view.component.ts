import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClassComponent } from '../class/class.component';

@Component({
  imports: [CommonModule, FormsModule, ClassComponent],
  selector: 'app-weekly-schedule-view',
  templateUrl: './weekly-schedule-view.component.html',
  styleUrls: ['./weekly-schedule-view.component.css']
})
export class WeeklyScheduleViewComponent {
  @Input() schedule: { [key: string]: any[] } = {};
  @Input() showButtons: boolean = true;
  @Output() removeClassFromSchedule = new EventEmitter<{ day: string, classComponent: any }>();
  days: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];


  addClassToSchedule(day: string, className: string) {
    this.schedule[day].push(className);
  }

  removeClass(day: string, className: string) {
    if (this.schedule[day]) {
      this.schedule[day] = this.schedule[day].filter(cls => cls.className !== className);
    }
  }

  saveSchedule() {
    console.log('Schedule saved:', this.schedule);
    // Add logic to save the schedule
  }

  deleteSchedule() {
    console.log('Schedule deleted');
  }
}