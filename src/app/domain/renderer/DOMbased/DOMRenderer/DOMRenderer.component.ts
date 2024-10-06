import { ChangeDetectionStrategy, Component, effect, input, type OnInit } from '@angular/core';
import { Playground } from '../../../playground/domain/playground';

@Component({
  selector: 'app-domrenderer',
  standalone: true,
  imports: [
  ],
  templateUrl: './DOMRenderer.component.html',
  styleUrl: './DOMRenderer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DOMRendererComponent implements OnInit {
  public playground = input<null | Playground>(null)
  constructor() {
    console.log(this.playground)
    effect(() => {
      console.log('Rendering playground', this.playground())
    })
  }

  ngOnInit(): void { 
    
  }

}
