import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-weekly-schedule-view',
  templateUrl: './weekly-schedule-view.component.html',
  styleUrls: ['./weekly-schedule-view.component.css'],
  imports: [CommonModule]
})
export class WeeklyScheduleViewComponent {
  @Input() schedule: { [key: string]: any[] } = {};
  days: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
}