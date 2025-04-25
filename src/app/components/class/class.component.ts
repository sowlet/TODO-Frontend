import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from '../search/search.component';
import { ClassModel } from '../../models/class.model'; // Assuming you have a ClassModel defined in models folder

@Component({
  selector: 'app-class',
  imports: [CommonModule, FormsModule],
  templateUrl: './class.component.html',
  styleUrl: './class.component.css'
})
export class ClassComponent {
  @Input() className: string = '';
  @Input() number: number = 0;
  @Input() subject: string = '';
  @Input() section: string = '';
  @Input() semester: string = '';
  @Input() classId: number = -1;
  @Input() startTime: string = '';
  @Input() endTime: string = '';
  @Input() classTimes: string = '';
  @Input() days: string = '';
  @Input() isInSchedule: boolean = false;

  @Input() schedule: { [key: string]: any[] } = {}; // Schedule passed from parent component

@Output() addClass = new EventEmitter<ClassModel>();
@Output() removeClass = new EventEmitter<number>();

  @Input() search!: SearchComponent;
  // need a reference to the scheduleView component as well
  
  constructor() {

  }

  setClassDetails(
    className: string,
    number: number,
    subject: string,
    section: string,
    semester: string,
    classId: number,
    startTime: string,
    endTime: string,
    days: string
  ): void {
    this.className = className;
    this.number = number;
    this.subject = subject;
    this.section = section;
    this.semester = semester;
    this.classId = classId;
    this.startTime = startTime;
    this.endTime = endTime;
    this.days = days;
  }

  addToSchedule(): void {
    if (this.checkTimeConflict(this.schedule)) {
      alert('Cannot add class: Time Conflict');
      return;
    }
    this.isInSchedule = true;
    this.addClass.emit({
      className: this.className,
      number: this.number,
      subject: this.subject,
      section: this.section,
      semester: this.semester,
      classId: this.classId,
      classTimes: this.classTimes,
      days: this.days,
      isInSchedule: true
    } as ClassModel);
  }

  private checkTimeConflict(schedule: { [key: string]: any[] }): boolean {
    const [startTime, endTime] = this.classTimes.split(' - ').map(this.convertTimeToMinutes);
  
    for (const day of this.days.split('')) {
      const dayName = this.mapDayCodeToName(day);
      if (schedule[dayName]) {
        for (const scheduledClass of schedule[dayName]) {
          const [scheduledStart, scheduledEnd] = scheduledClass.classTimes.split(' - ').map(this.convertTimeToMinutes);
          if ((startTime >= scheduledStart && startTime < scheduledEnd) || 
              (endTime > scheduledStart && endTime <= scheduledEnd) || 
              (startTime <= scheduledStart && endTime >= scheduledEnd)) {
            return true; // Conflict detected
          }
        }
      }
    }
  
    return false; // No conflict
  }

  // Helper method to convert time in "HH:MM" format to minutes
private convertTimeToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

  private mapDayCodeToName(dayCode: string): string {
    const dayMapping: { [key: string]: string } = {
      M: 'Monday',
      T: 'Tuesday',
      W: 'Wednesday',
      R: 'Thursday',
      F: 'Friday'
    };
    return dayMapping[dayCode] || '';
  }

  removeFromSchedule(): void {
    this.isInSchedule = false;
    this.removeClass.emit(this.classId); // Emit only the classId
  }
}
