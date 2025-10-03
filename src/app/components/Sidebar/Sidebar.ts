import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, MatListModule, MatToolbarModule],
  templateUrl: './Sidebar.html',
  styleUrls: ['./Sidebar.css'],
})
export class SidebarComponent {}
