import { Component } from '@angular/core';
import { SearchComponent } from '../components/search/search.component';
import { HotbarComponent } from '../components/hotbar/hotbar.component';
import { ClassComponent } from '../components/class/class.component';
import { WeeklyScheduleViewComponent } from '../components/weekly-schedule-view/weekly-schedule-view.component';

@Component({
  selector: 'app-schedule-editor',
  standalone: true,
  imports: [
    SearchComponent,
    HotbarComponent,
    ClassComponent,
    WeeklyScheduleViewComponent
  ], // Import SearchComponent here
  templateUrl: './schedule-editor.component.html',
  styleUrls: ['./schedule-editor.component.css']
})
export class ScheduleEditorComponent {
  schedule = {
    Monday: [
      { className: 'Math 101', courseCode: 'MTH101', profName: 'Dr. Smith', classTime: '9:00 AM' },
      { className: 'History 201', courseCode: 'HIS201', profName: 'Prof. Brown', classTime: '11:00 AM' }
    ],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: []
  };
}