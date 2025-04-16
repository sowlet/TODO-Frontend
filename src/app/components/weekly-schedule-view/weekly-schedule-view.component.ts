import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-weekly-schedule-view',
  templateUrl: './weekly-schedule-view.component.html',
  styleUrls: ['./weekly-schedule-view.component.css']
})
export class WeeklyScheduleViewComponent {
  @Input() schedule: { [key: string]: any[] } = {};
  days: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  saveSchedule() {
    console.log('Schedule saved:', this.schedule);
    // Add logic to save the schedule
  }

  deleteSchedule() {
    console.log('Schedule deleted');
    // Add logic to delete the schedule
    this.schedule = { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] };
  }
}