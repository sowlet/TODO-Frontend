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
    WeeklyScheduleViewComponent
  ], // Import SearchComponent here
  templateUrl: './schedule-editor.component.html',
  styleUrls: ['./schedule-editor.component.css']
})
export class ScheduleEditorComponent {
  schedule: { [key: string]: any[] } = {};
  days: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  handleAddClass(event: { day: string; classItem: any }): void {
    if (!this.schedule[event.day]) {
      this.schedule[event.day] = [];
    }
    this.schedule[event.day].push(event.classItem);
  }

}