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
  courseCode: string = '';
  courseDescription: string = '';
  @Input() isInSchedule: boolean = false;

@Output() addClass = new EventEmitter<ClassModel>();
@Output() removeClass = new EventEmitter<ClassModel>();

  @Input() search!: SearchComponent;
  // need a reference to the scheduleView component as well
  
  constructor() {
    // Initialize default values if needed
    this.className = 'Default Class Name';
    this.courseCode = 'Default Course Code';
    this.courseDescription = 'Default Course Description';
  }

  setClassDetails(className: string, courseCode: string, courseDescription: string): void {
    this.className = className;
    this.courseCode = courseCode;
    this.courseDescription = courseDescription;
  }

  addToSchedule(): void {
    this.isInSchedule = true;
    this.addClass.emit({
      className: this.className,
      courseCode: this.courseCode,
      courseDescription: this.courseDescription,
      isInSchedule: true
    } as ClassModel);
  }

  removeFromSchedule(): void {
    this.isInSchedule = false;
    this.removeClass.emit({
      className: this.className,
      courseCode: this.courseCode,
      courseDescription: this.courseDescription,
      isInSchedule: false
    } as ClassModel);
  }
}
