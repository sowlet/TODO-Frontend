import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { WeeklyScheduleViewComponent } from '../components/weekly-schedule-view/weekly-schedule-view.component';
import { RecommendedLinksComponent } from '../components/recommended-links/recommended-links.component';
import { HotbarComponent } from '../components/hotbar/hotbar.component';
import { get } from 'http';
import { HotbarFComponent } from "../components/hotbar-f/hotbar-f.component";

@Component({
  selector: 'app-home',
  imports: [HotbarComponent, CommonModule, FormsModule, HttpClientModule, RecommendedLinksComponent, WeeklyScheduleViewComponent, HotbarFComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  candidateSchedules: any[] = this.getCandidateSchedules();
  newSchedule = { name: '', semester: '', schedule: [] };

  constructor(private router: Router) {{

  }
    // Initialization logic can go here if needed
  }

  // Method to navigate to the candidate schedule page
  navigateToSchedule(scheduleId: number) {
    this.router.navigate(['/schedule-editor', scheduleId]);
  }


  getCandidateSchedules() {

    // add logic to fetch candidate schedules from the backend

    // for now, return a mock list of candidate schedules
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

  createCandidateSchedule() {
    // add logic to create a new candidate schedule via POST request.
    const newId = this.candidateSchedules.length + 1; // Generate a new ID
    const newSchedule = {
      id: newId,
      name: this.newSchedule.name,
      semester: this.newSchedule.semester,
      schedule: [], // Empty schedule for now
    };

    this.candidateSchedules.push(newSchedule); // Add the new schedule to the list
    this.newSchedule = { name: '', semester: '', schedule: [] }; // Reset the form
    console.log('Created new schedule:', newSchedule);
  }

  deleteCandidateSchedule(scheduleId: number) {
    // add logic to delete a candidate schedule via DELETE request.
    console.log("Deleting schedule with ID:", scheduleId);
  }
}
