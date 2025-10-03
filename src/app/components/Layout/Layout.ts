import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SidebarComponent } from '../Sidebar/Sidebar';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, MatSidenavModule, MatToolbarModule, SidebarComponent],
  templateUrl: './Layout.html',
  styleUrls: ['./Layout.css'],
})
export class LayoutComponent {}
