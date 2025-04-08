import { Routes } from '@angular/router';
import { ScheduleEditorComponent } from './schedule-editor/schedule-editor.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


export const routes: Routes = [
    {path: 'schedule-editor', component: ScheduleEditorComponent},
    {path: 'home', component: HomeComponent},
    {path: '', redirectTo: '/home', pathMatch: 'full'},
];
