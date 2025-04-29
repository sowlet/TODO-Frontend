import { Component, Input, Output } from '@angular/core';
import { SearchComponent } from '../components/search/search.component';
import { HotbarComponent } from '../components/hotbar/hotbar.component';
import { ClassComponent } from '../components/class/class.component';
import { WeeklyScheduleViewComponent } from '../components/weekly-schedule-view/weekly-schedule-view.component';
import { ClassModel } from '../models/class.model';
import { HotbarFComponent } from "../components/hotbar-f/hotbar-f.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../account.service';

@Component({
  selector: 'app-schedule-editor',
  standalone: true,
  imports: [
    SearchComponent,
    HotbarComponent,
    WeeklyScheduleViewComponent,
    HotbarFComponent,
    CommonModule,
    FormsModule
], // Import SearchComponent here
  templateUrl: './schedule-editor.component.html',
  styleUrls: ['./schedule-editor.component.css']
})
export class ScheduleEditorComponent {
  schedule: { [key: string]: any[] } = {};
  days: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  @Input() scheduleName: string = '';
  @Input() classes: any[] = []
  @Input() customEvents: any[] = []
  @Input() username: string = '';
  @Input() semester: string = ' ';

   // Form data for creating a custom event
   customEvent = {
    name: '',
    location: '',
    day: 'Monday',
    startTime: '',
    endTime: '',
    id: ''
  };
  

  ngOnInit(): void {
    console.log('Initial classes:', this.classes);
    console.log('Initial custom events:', this.customEvents);
    this.username = this.authService.getUsername();
    console.log("Semester in schedule editor component: ", this.semester);
  }
  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private authService: AuthService) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { 
      scheduleName: string,
      classes: any[],
      customEvents: any[],
      semester: string
    };
  
    if (state) {
      console.log('Received state:', state); // Add this log
      this.scheduleName = state.scheduleName;
      this.semester = state.semester;
      if (state.classes) {
        console.log('Raw classes:', state.classes); // Add this log
        this.classes = state.classes.map((classItem) => {
          console.log('Mapping class item:', classItem); // Add this log
          return new ClassModel(classItem);
        });
        console.log('Mapped classes:', this.classes); // Add this log
      }
      if (state.customEvents) {
        this.customEvents = state.customEvents;
      }
    }
  }

  // method to handle loadding classes and custom events into the schedule
  loadSchedule(): void {
    // Reset schedule
    this.schedule = {};
    
    // Initialize empty arrays for each day
    this.days.forEach(day => {
      this.schedule[day] = [];
    });
  
    // Use the same day mapping as search component
    const dayMap: { [key: string]: string } = {
      'M': 'Monday',
      'T': 'Tuesday',
      'W': 'Wednesday',
      'R': 'Thursday',
      'F': 'Friday'
    };
  
    // Process each class
    this.classes.forEach(classItem => {
      const days = classItem.days.split('');
      const uniqueDays = new Set<string>();
  
      // Convert each letter to its corresponding day name
      days.forEach((letter: string) => {
        if (dayMap[letter]) {
          uniqueDays.add(dayMap[letter]);
        }
      });
  
      // Add class to each day in the schedule
      uniqueDays.forEach(day => {
        const [startTime, endTime] = classItem.classTimes.split(' - ');
        
        // Create schedule entry
        const scheduleEntry = {
          ...classItem,
          startTime,
          endTime,
          isInSchedule: true
        };
  
        // Add to schedule
        if (!this.schedule[day]) {
          this.schedule[day] = [];
        }
        this.schedule[day].push(scheduleEntry);
      });
    });
  
    // Process custom events if any
    this.customEvents?.forEach(event => {
      if (!this.schedule[event.day]) {
        this.schedule[event.day] = [];
      }
      this.schedule[event.day].push({
        ...event,
        isInSchedule: true
      });
    });
  
    console.log('Schedule loaded:', this.schedule);
  }

  // method to handle adding class from search results to the weekly schedule view component
  handleAddClass(event: { day: string; classComponent: any; onConflict: () => void }): void {
    const { day, classComponent, onConflict } = event;
    
    // Extract start and end times from classTimes string
    const [startTime, endTime] = classComponent.classTimes.split(' - ');
    
    console.log('Checking conflict for:', {
      day,
      className: classComponent.className,
      startTime,
      endTime
    });
  
    if (this.checkTimeConflict(day, startTime, endTime)) {
      console.error(`Time conflict detected for class "${classComponent.className}" on ${day}.`);
      onConflict(); // Call the conflict callback
      return; // Prevent adding the class
    }
  
    if (!this.schedule[day]) {
      this.schedule[day] = [];
    }
  
    this.schedule[day].push({
      ...classComponent,
      startTime,
      endTime
    });
    
    console.log(`Class ${classComponent.className} added to ${day}`);
    console.log('Current schedule:', this.schedule);
  }

   // This code was generated by GitHub Copilot and modified
   // Method to handle adding a custom event
   // Checks to make sure the event has a valid name
   addCustomEvent(): void {
    const event = { ...this.customEvent, isInSchedule: true };

    if (!event.name.trim()) {
      console.error('Event name cannot be empty.');
      alert('Please provide a valid event name.');
      return; // Prevent adding the event
    }

    if (!event.day.trim()) {
      console.error('Day cannot be empty.');
      alert('Please provide a valid day name.');
      return; // Prevent adding the event
    }

    if (!event.startTime.trim()) {
      console.error('Start time cannot be empty.');
      alert('Please provide a valid time.');
      return; // Prevent adding the event
    }

    if (!event.endTime.trim()) {
      console.error('End time cannot be empty.');
      alert('Please provide a valid time.');
      return; // Prevent adding the event
    }

    if (this.checkTimeConflict(event.day, event.startTime, event.endTime)) {
      console.error(`Time conflict detected for event "${event.name}" on ${event.day} from ${event.startTime} to ${event.endTime}.`);
      alert(`Time conflict detected! Event "${event.name}" cannot be added.`);
      return; // Prevent adding the event
    }

    if (!this.schedule[event.day]) {
      this.schedule[event.day] = [];
    }

    this.schedule[event.day].push(event);

    const url = `http://localhost:7070/schedule-ce?username=${this.username}&account=${this.scheduleName}&eventName=${event.name}&eventLocation=${event.location}&eventDay=${event.day}&startTime=${event.startTime}&endTime=${event.endTime}`

    this.http.post(url, {}).subscribe({
      next: (response: any) => {
        if (response.id) {
          this.customEvent.id = response.id; // Assign the ID from the response
          console.log('Custom event saved successfully with ID:', response.id);
        } else {
          console.error('Response does not contain an ID:', response);
        }
      },
      error: (error) => {
        console.error('Error saving schedule:', error.message);
      }
    });
  

    console.log(`Custom event ${event.name} added to ${event.day}`);
    console.log('Current schedule:', this.schedule);

    // Reset the form
    this.customEvent = {
      name: '',
      location: '',
      day: 'Monday',
      startTime: '',
      endTime: '',
      id: ''
    };
  }

// Method to check if a time conflict exists
checkTimeConflict(day: string, startTime: string, endTime: string): boolean {
  //This code was completed by GitHub Copilot and modified

  //Check if any events are scheduled for the day in question
  if (!this.schedule[day]) {
    return false; 
  }

  const start = this.convertTimeToMinutes(startTime);
  const end = this.convertTimeToMinutes(endTime);

  for (const item of this.schedule[day]) {
    const itemStart = this.convertTimeToMinutes(item.startTime);
    const itemEnd = this.convertTimeToMinutes(item.endTime);

    // Check if the time ranges overlap
    if ((start >= itemStart && start < itemEnd) || (end > itemStart && end <= itemEnd) || (start <= itemStart && end >= itemEnd)) {
      return true; // Conflict detected
    }
  }

  return false; // No conflict
}

// Helper method to convert time in "HH:MM" format to minutes
private convertTimeToMinutes(time: string): number {
  if (!time || !time.includes(':')) {
    console.error(`Invalid time format: "${time}"`);
    return 0; // Return 0 or handle the error appropriately
  }
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}
}