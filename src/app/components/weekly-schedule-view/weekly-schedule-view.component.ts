import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClassComponent } from '../class/class.component';
import { ClassModel } from '../../models/class.model'; // Assuming you have a ClassModel defined in models folder
import { CustomEventComponent } from '../custom-event/custom-event.component';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../account.service';

@Component({
  imports: [CommonModule, FormsModule, ClassComponent, CustomEventComponent],
  selector: 'app-weekly-schedule-view',
  templateUrl: './weekly-schedule-view.component.html',
  styleUrls: ['./weekly-schedule-view.component.css']
})
export class WeeklyScheduleViewComponent {
  @Input() schedule: { [key: string]: any[] } = {};
  @Input() scheduleName: string = '';
  @Input() showButtons: boolean = true;
  days: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  username: string = '';

  constructor(private http: HttpClient, private authService: AuthService) {}


  ngOnInit(): void {
    // Initialize the schedule for each day if not already set
    console.log('Initial schedule:', this.schedule);
  }

  // method to remove a class from the schedule
  removeClassFromSchedule(classId: number): void {
    this.days.forEach(day => {
      if (this.schedule[day]) {
        // Remove all instances of the class with the given classId
        this.schedule[day] = this.schedule[day].filter(cls => cls.classId !== classId);
      }
    });
    console.log(`Class with ID ${classId} removed from the schedule`);
    console.log('Current schedule:', this.schedule);
  }

  // method to save the current schedule to the backend
  saveSchedule() {
    // Extract all unique class IDs from the schedule
    const classIds = new Set<number>();
    this.days.forEach(day => {
      if (this.schedule[day]) {
        this.schedule[day].forEach((item: any) => {
          if (item.classId) {
            classIds.add(item.classId);
          }
        });
      }
    });

    // Convert Set to array
    const classIdsArray = Array.from(classIds);

    this.username = this.authService.getUsername();

    console.log(classIdsArray);
    console.log(`Saving schedule for user: ${this.username} with name: ${this.scheduleName}`);

    // Make the PUT request
    this.http.put(`http://localhost:7070/schedule?username=${this.username}&name=${this.scheduleName}`,
      { classes: classIdsArray }
    ).subscribe({
      next: (response) => {
        console.log('Schedule saved successfully:', response);
      },
      error: (error) => {
        console.error('Error saving schedule:', error.message);
      }
    });
  }
      

  // method to delete the current schedule/wipe all of the classes
  deleteSchedule() {
    // remove all classes from each day of the schedule
    this.days.forEach(day => {
      this.schedule[day] = [];
    });
    console.log('Schedule cleared');
  }

// method to remove a custom event from the schedule
removeEventFromSchedule(day: string, eventItem: any): void {
  if (this.schedule[day]) {
    this.schedule[day] = this.schedule[day].filter(event => event.id !== eventItem.id);
  }
  console.log(`Custom event ${eventItem.name} removed from ${day}`);
  console.log('Current schedule:', this.schedule);
}
} 