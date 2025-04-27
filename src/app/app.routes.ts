import { Routes } from '@angular/router';
import { ScheduleEditorComponent } from './schedule-editor/schedule-editor.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ProfileComponent } from './profile/profile.component';
import { authGuard } from './auth.service';

export const routes: Routes = [
    {
        path: 'schedule-editor/:scheduleName', 
        component: ScheduleEditorComponent,
        canActivate: [authGuard]
    },
    {path: 'about', component: AboutComponent},
    {
        path: 'home', 
        component: HomeComponent,
        canActivate: [authGuard]
    },
    {path: 'login', component: LoginComponent},
    {path: 'sign-in', component: SignInComponent},
    {
        path: 'profile', 
        component: ProfileComponent,
        canActivate: [authGuard]
    },
    {path: '', redirectTo: '/about', pathMatch: 'full'},
];