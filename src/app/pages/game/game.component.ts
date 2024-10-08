import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal, type OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameStateService } from '../../domain/control/domain/services/game-state.service';
import { ControlBarComponent } from '../../domain/control/feature/control-bar/control-bar.component';
import { InfoBarComponent } from '../../domain/control/feature/info-bar/info-bar.component';
import { Playground } from '../../domain/playground/domain/playground';
import { PlaygroundGenerator } from '../../domain/playground/domain/playground.generator';
import { DOMRendererComponent } from '../../domain/renderer/DOMbased/DOMRenderer/DOMRenderer.component';
import { generateSeed } from '../../domain/seed/domain/seed.generator';
import { SeedRandom } from '../../domain/seed/domain/seed.random';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    RouterOutlet, 
    DOMRendererComponent, 
    ControlBarComponent,
    InfoBarComponent
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameComponent implements OnInit {
  private readonly _gameState = inject(GameStateService);

  public readonly playground = signal<Playground | null>(null);

  public ngOnInit(){
    const seed = generateSeed(20);
    this.generatePlaygroundBySeed(seed);
    this.startGame();
  }

  public generatePlaygroundBySeed(seed: string) {
    const generator = new SeedRandom(
      seed
    );
    const playground = new PlaygroundGenerator(
      generator
    ).generatePlayground({
      dimensions: {
        width: 10,
        height: 10
      }
    })
    this.playground.set(playground);
    this._gameState.minesCount.next(playground.meta.totalMines);
  }

  private startGame() {
    this._gameState.startRound()
  }

}
