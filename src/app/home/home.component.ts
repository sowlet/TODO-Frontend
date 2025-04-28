import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { WeeklyScheduleViewComponent } from '../components/weekly-schedule-view/weekly-schedule-view.component';
import { RecommendedLinksComponent } from '../components/recommended-links/recommended-links.component';
import { HotbarComponent } from '../components/hotbar/hotbar.component';
import { get } from 'http';
import { HotbarFComponent } from "../components/hotbar-f/hotbar-f.component";
import { AuthService } from '../account.service';

@Component({
  selector: 'app-home',
  imports: [HotbarComponent, CommonModule, FormsModule, HttpClientModule, RecommendedLinksComponent, WeeklyScheduleViewComponent, HotbarFComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  username: string = '';
  candidateSchedules: any[] = []
  newSchedule = { name: '', semester: '', schedule: [] };

  constructor(private router: Router, private http: HttpClient, private authService: AuthService) {{

  }
    // Initialization logic can go here if needed
  }

  ngOnInit(): void {
    this.username = this.authService.getUsername();
    this.getCandidateSchedules(); // Fetch candidate schedules on component initialization
  }

  // Method to navigate to the candidate schedule page
  navigateToSchedule(schedule: any) {
    console.log('Navigating to schedule:', schedule);
    this.router.navigate(['/schedule-editor', schedule.name], {
      state: { scheduleName: schedule.name, 
        classes: schedule.classes.map((classItem: any) => ({
          className: classItem.name,
          number: classItem.number,
          subject: classItem.subject,
          section: classItem.section,
          semester: classItem.semester,
          classId: classItem.id,
          classTimes: `${classItem.startTime} - ${classItem.endTime}`,
          days: classItem.days,
          isInSchedule: true
        })),
        customEvents: schedule.customEvents || [] }
    });
  }


  getCandidateSchedules() {
    // add logic to fetch candidate schedules from the backend...
    // format looks like this: {name: 'Schedule 1', classes: [], customEvents: []}
    const url = `http://localhost:7070/schedule?username=${this.username}`; // API endpoint

  this.http.get<any[]>(url).subscribe({
    next: (response) => {
      console.log('Fetched candidate schedules:', response);
      this.candidateSchedules = response; // Update the candidateSchedules array with the fetched data
    },
    error: (error) => {
      console.error('Error fetching candidate schedules:', error);
    }
  });

  console.log('Candidate Schedules after fetch:', this.candidateSchedules);
}

  createCandidateSchedule() {
    const newSchedule = {
      name: this.newSchedule.name,
      semester: this.newSchedule.semester,
      schedule: [], // Empty schedule for now
    };

    const url = `http://localhost:7070/schedule?username=${this.username}&name=${newSchedule.name}`;

    this.http.post(url, {}).subscribe({
      next: (response: any) => {
        console.log('Schedule created successfully:', response);

        // Add the new schedule to the list if the backend confirms success
        const newId = this.candidateSchedules.length + 1; // Generate a new ID
        const newSchedule = {
          id: newId,
          name: this.newSchedule.name,
          semester: this.newSchedule.semester,
          schedule: [] // Empty schedule for now
        };

        this.candidateSchedules.push(newSchedule); // Add the new schedule to the list
        this.getCandidateSchedules(); // Refresh the list of candidate schedules
        this.newSchedule = { name: '', semester: '', schedule: [] }; // Reset the form
      },
      error: (error) => {
        console.error('Error creating schedule:', error);
      }
    });
  }

  deleteCandidateSchedule(scheduleName: string) {
    const url = `http://localhost:7070/schedule?username=${this.username}&name=${scheduleName}`;
  
    this.http.delete(url).subscribe({
      next: () => {
        console.log(`Schedule '${scheduleName}' deleted successfully.`);
        
        // Remove the deleted schedule from the candidateSchedules array
        this.candidateSchedules = this.candidateSchedules.filter(
          (schedule) => schedule.name !== scheduleName
        );
      },
      error: (error) => {
        console.error(`Error deleting schedule '${scheduleName}':`, error);
      }
    });
  }
}
