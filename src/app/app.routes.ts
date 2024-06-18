import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { NotesDashboardComponent } from './notes-dashboard/notes-dashboard.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
    {path:'', component:LandingComponent},
    {path:'landing', pathMatch:'full', redirectTo: ''},
    {path:'login', component:LoginComponent},
    {path:'notes-dashboard', component:NotesDashboardComponent},
    {path:'register',component:RegisterComponent}
];
