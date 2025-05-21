import { Routes } from '@angular/router';
import { ProfilesComponent } from './features/profile/profiles.component';
import { UsersComponent } from './features/user/users.component';

export const routes: Routes = [
    { path: '', redirectTo: 'profiles', pathMatch: 'full' },
    { path: 'profiles', component: ProfilesComponent },
    { path: 'users', component: UsersComponent }
];
