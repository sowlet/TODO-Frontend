import { Routes } from '@angular/router';
import { ScheduleEditorComponent } from './schedule-editor/schedule-editor.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { SignInComponent } from './sign-in/sign-in.component';


export const routes: Routes = [
    {path: 'schedule-editor/:id', component: ScheduleEditorComponent},
    {path: 'about', component: AboutComponent},
    {path: 'home', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'sign-in', component: SignInComponent},
    {path: '', redirectTo: '/about', pathMatch: 'full'},
];
