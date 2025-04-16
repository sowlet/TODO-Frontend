import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ScheduleEditorComponent } from './schedule-editor/schedule-editor.component';
import { HomeComponent } from './home/home.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ScheduleEditorComponent, CommonModule, HttpClientModule, FormsModule, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TODO';
}
