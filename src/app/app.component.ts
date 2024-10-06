import { Component, computed, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { PlaygroundGenerator } from './domain/playground/domain/playground.generator';
import { SeedRandom } from './domain/seed/domain/seed.random';
import { generateSeed } from './domain/seed/domain/seed.generator';
import { DOMRendererComponent } from './domain/renderer/DOMbased/DOMRenderer/DOMRenderer.component';
import { Playground } from './domain/playground/domain/playground';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, DOMRendererComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'minesweeper';

  public readonly playground = signal<Playground | null>(null);

  public readonly width = computed(() => {
    return this.playground()?.meta.dimensions.width ?? 0
  })

  public readonly height = computed(() => {
    return this.playground()?.meta.dimensions.height ?? 0
  })

  public ngOnInit(){
    const generator = new SeedRandom(
      generateSeed(20)
      // '3006050092'
    );
    const playground = new PlaygroundGenerator(
      generator
    ).generatePlayground({
      dimensions: {
        width: 10,
        height: 10
      }
    })
    console.log(playground);
    this.playground.set(playground);
  }
}
