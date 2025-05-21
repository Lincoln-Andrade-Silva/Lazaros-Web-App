import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-navbar',
  styleUrls: ['./navbar.component.css'],
  templateUrl: './navbar.component.html',
  imports: [RouterModule, MatToolbarModule, MatButtonModule],
})
export class NavbarComponent { }