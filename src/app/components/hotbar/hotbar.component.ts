import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ScheduleEditorComponent } from '../../schedule-editor/schedule-editor.component';

@Component({
  selector: 'app-hotbar',
  imports: [],
  templateUrl: './hotbar.component.html',
  styleUrl: './hotbar.component.css'
})
export class HotbarComponent {

  constructor(private router: Router) { }

  onLogoClick(){
    // load the schedule editor page: http://localhost:4200/schedule-editor
    console.log('Logo clicked');
    this.router.navigate(['/schedule-editor']);
  }


  onProfileClick(){
    // load the profile page: http://localhost:4200/profile
  }


}
