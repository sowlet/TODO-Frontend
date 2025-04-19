import { Component } from '@angular/core';
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

  constructor(private http: HttpClient) {}

  onSearch(): void {
    if (this.searchQuery.trim()) {
      // `/api/search?query=${this.searchQuery}` replace this with actual API endpoint
      this.http.get<any[]>(`http://localhost:7070/search?query=${this.searchQuery}`).subscribe(
        (results) => {
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

// removeFromSearchResults(class: ClassComponent): void {

// addToSearchResults(class: ClassComponent): void {

}