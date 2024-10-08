import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ControlBarComponent } from './domain/control/feature/control-bar/control-bar.component';
import { InfoBarComponent } from './domain/control/feature/info-bar/info-bar.component';
import { DOMRendererComponent } from './domain/renderer/DOMbased/DOMRenderer/DOMRenderer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, 
    DOMRendererComponent, 
    ControlBarComponent,
    InfoBarComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  

}
