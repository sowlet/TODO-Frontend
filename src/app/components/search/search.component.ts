import { Component, EventEmitter, Output } from '@angular/core';
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
  searchResults: ClassModel[] = [];

  @Output() addClassToSchedule = new EventEmitter<{day: string, classComponent: any}>();

  constructor(private http: HttpClient) {}

  onSearch(): void {
    if (this.searchQuery.trim()) {
      // clear search results before fetching new classes
      this.searchResults = [];

      
      // `/api/search?query=${this.searchQuery}` replace this with actual API endpoint
      this.http.get<any[]>(`http://localhost:7070/search?query=${this.searchQuery}`).subscribe(
        (results) => {
          console.log('Search results received:', results);
          for (const result of results) {
            const classComponent = new ClassComponent();
            classComponent.className = result;
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
  const day = 'Monday'; // Replace with logic to determine the day
  this.addClassToSchedule.emit({ day, classComponent: classItem });
  // remove class from search results when added to schedule
  this.searchResults = this.searchResults.filter(item => item.className !== classItem.className);
}


// removeFromSearchResults(class: ClassComponent): void {

// addToSearchResults(class: ClassComponent): void {

}