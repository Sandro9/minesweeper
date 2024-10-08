import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
  selector: 'app-map-preview',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './map-preview.component.html',
  styleUrl: './map-preview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapPreviewComponent implements OnInit {

  ngOnInit(): void { }

}
