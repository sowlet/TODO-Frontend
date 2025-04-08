import { Component } from '@angular/core';
import { SearchComponent } from '../components/search/search.component';
import { HotbarComponent } from '../components/hotbar/hotbar.component';

@Component({
  selector: 'app-schedule-editor',
  standalone: true,
  imports: [
    SearchComponent,
    HotbarComponent
  ], // Import SearchComponent here
  templateUrl: './schedule-editor.component.html',
  styleUrls: ['./schedule-editor.component.css']
})
export class ScheduleEditorComponent {}