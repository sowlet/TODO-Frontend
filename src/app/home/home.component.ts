import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { WeeklyScheduleViewComponent } from '../components/weekly-schedule-view/weekly-schedule-view.component';
import { RecommendedLinksComponent } from '../components/recommended-links/recommended-links.component';
import { HotbarComponent } from '../components/hotbar/hotbar.component';
import { get } from 'http';

@Component({
  selector: 'app-home',
  imports: [HotbarComponent, CommonModule, FormsModule, HttpClientModule, RecommendedLinksComponent, WeeklyScheduleViewComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  candidateSchedules: any[] = this.getCandidateSchedules();

  constructor(private router: Router) {{

  }
    // Initialization logic can go here if needed
  }

  // Method to navigate to the candidate schedule page
  navigateToSchedule(scheduleId: number) {
    this.router.navigate(['/schedule-editor', scheduleId]);
  }


  getCandidateSchedules() {
    return [
      {
        id: 1,
        name: 'John Doe',
        semester: 'Spring 2025',
        schedule: [
          { day: 'Monday', time: '9:00 AM - 10:00 AM' },
          { day: 'Tuesday', time: '10:00 AM - 11:00 AM' },
          { day: 'Wednesday', time: '11:00 AM - 12:00 PM' },
          { day: 'Thursday', time: '1:00 PM - 2:00 PM' },
          { day: 'Friday', time: '2:00 PM - 3:00 PM' }
        ]
      },
      {
        id: 2,
        name: 'Jane Smith',
        semester: 'Fall 2025',
        schedule: [
          { day: 'Monday', time: '10:00 AM - 11:00 AM' },
          { day: 'Tuesday', time: '11:00 AM - 12:00 PM' },
          { day: 'Wednesday', time: '12:00 PM - 1:00 PM' },
          { day: 'Thursday', time: '2:00 PM - 3:00 PM' },
          { day: 'Friday', time: '3:00 PM - 4:00 PM' }
        ]
      }
    ];
  }
}
