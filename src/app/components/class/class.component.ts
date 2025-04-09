import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-class',
  imports: [CommonModule, FormsModule],
  templateUrl: './class.component.html',
  styleUrl: './class.component.css'
})
export class ClassComponent {
  className: string = '';
  courseCode: string = '';
  courseDescription: string = '';
  isInSchedule: boolean = false;
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
    // also call delete from search results method from search component
    // add to schedule component
  }

  removeFromSchedule(): void {
    this.isInSchedule = false;
    // also call add to search results method from search component
    // delete from schedule component
  }
}
