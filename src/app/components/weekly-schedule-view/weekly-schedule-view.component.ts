import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClassComponent } from '../class/class.component';
import { ClassModel } from '../../models/class.model'; // Assuming you have a ClassModel defined in models folder
import { CustomEventComponent } from '../custom-event/custom-event.component';

@Component({
  imports: [CommonModule, FormsModule, ClassComponent, CustomEventComponent],
  selector: 'app-weekly-schedule-view',
  templateUrl: './weekly-schedule-view.component.html',
  styleUrls: ['./weekly-schedule-view.component.css']
})
export class WeeklyScheduleViewComponent {
  @Input() schedule: { [key: string]: any[] } = {};
  @Input() showButtons: boolean = true;
  days: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

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
    console.log('Schedule saved:', this.schedule);
    // Add logic to save the schedule to the backend here
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