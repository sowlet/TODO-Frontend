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

@Output() addClass = new EventEmitter<ClassModel>();
@Output() removeClass = new EventEmitter<ClassModel>();

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
    this.isInSchedule = true;
    this.addClass.emit({
      className: this.className,
      number: this.number,
      subject: this.subject,
      section: this.section,
      semester: this.semester,
      classId: this.classId,
      classTimes: `${this.startTime} - ${this.endTime}`,
      days: this.days,
      isInSchedule: true
    } as ClassModel);
  }

  removeFromSchedule(): void {
    this.isInSchedule = false;
    this.removeClass.emit({
      className: this.className,
      number: this.number,
      subject: this.subject,
      section: this.section,
      semester: this.semester,
      classId: this.classId,
      classTimes: `${this.startTime} - ${this.endTime}`,
      days: this.days,
      isInSchedule: false
    } as ClassModel);
  }
}
