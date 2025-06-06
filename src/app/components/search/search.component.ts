import { Component, EventEmitter, Output, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClassComponent } from '../class/class.component';
import { ClassModel } from '../../models/class.model';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, CommonModule, ClassComponent],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchQuery: string = '';
  subject: string = '';
  startTime: string = '';
  endTime: string = '';
  days: string = '';
  daysMWF: boolean = false;
  daysTR: boolean = false;
  @Input() searchResults: ClassComponent[] = [];
  @Input() semester: string = ' ';

  @Output() addClassToSchedule = new EventEmitter<{
    day: string, 
    classComponent: any, 
    onConflict: () => void
  }>();

  ngOnInit(): void {
    console.log('Semester in search component: ', this.semester);
  }

  constructor(private http: HttpClient) {}

  updateDaysFilter(): void {
    const selectedDays = [];
    if (this.daysMWF) selectedDays.push('MWF');
    if (this.daysTR) selectedDays.push('TR');
    this.days = selectedDays.join(','); // Combine selected days into a comma-separated string
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      // clear search results before fetching new classes
      this.searchResults = [];
      // future url: `http://localhost:7070/search?query=${this.searchQuery}&subject=${this.subject}&startTime=${this.startTime}&endTime=${this.endTime}&days=${this.days}`

      // `/api/search?query=${this.searchQuery}` replace this with actual API endpoint
      this.http.get<any[]>(`http://localhost:7070/search?query=${this.searchQuery}&subject=${this.subject}&startTime=${this.startTime}&endTime=${this.endTime}&days=${this.days}&semester=${this.semester}`).subscribe(
        (results) => {
          console.log('Search results received:', results);
          for (const result of results) {
            const classComponent = new ClassComponent();
            classComponent.className = result.name;
            classComponent.number = result.number;
            classComponent.subject = result.subject;
            classComponent.section = result.section;
            classComponent.semester = result.semester;
            classComponent.classId = result.id;
            classComponent.classTimes = `${result.startTime} - ${result.endTime}`;
            classComponent.days = result.days;
            classComponent.isInSchedule = false;// Assuming classes are not in schedule initially
            this.searchResults.push(classComponent);
          }
          console.log('Search results:', this.searchResults);
        },
        (error) => {
          console.error('Error fetching search results:', error);
        }
      );
    }
  }

  handleAddClass(classItem: any): void {
    const dayMap: { [key: string]: string } = {
      'M': 'Monday',
      'T': 'Tuesday',
      'W': 'Wednesday',
      'R': 'Thursday',
      'F': 'Friday'
    };
  
    let conflictFound = false;
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
      this.addClassToSchedule.emit({ 
        day, 
        classComponent: classItem,
        onConflict: () => {
          conflictFound = true;
          alert(`Cannot add class: Time conflict on ${day}`);
        }
      });
    });
  
    // Only remove from search results if no conflicts were found
    if (!conflictFound) {
      this.searchResults = this.searchResults.filter(item => item.className !== classItem.className);
    }
  }


}