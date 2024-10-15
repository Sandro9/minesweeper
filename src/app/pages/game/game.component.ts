import { ChangeDetectionStrategy, Component, DestroyRef, effect, inject, signal, type OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { GameStateService } from '../../domain/control/domain/services/game-state.service';
import { InfoBarComponent } from '../../domain/control/feature/info-bar/info-bar.component';
import { Playground } from '../../domain/playground/domain/playground';
import { PlaygroundGenerator } from '../../domain/playground/domain/playground.generator';
import { DOMRendererComponent } from '../../domain/renderer/DOMbased/DOMRenderer/DOMRenderer.component';
import { SeedRandom } from '../../domain/seed/domain/seed.random';
import { SettingsService } from '../../domain/settings/domain/services/settings.service';
import { WinComponent } from '../../domain/game/ui/win/win.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject, filter, switchMap, tap } from 'rxjs';
import { LostComponent } from '../../domain/game/ui/lost/lost.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    RouterOutlet, 
    DOMRendererComponent, 
    InfoBarComponent,
    WinComponent,
    LostComponent
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameComponent implements OnInit {
  private readonly _gameState = inject(GameStateService);
  private readonly _settings = inject(SettingsService);
  private readonly _router = inject(Router);

  public readonly activePlayground$ = new BehaviorSubject<undefined | Playground>(undefined);
  public readonly playground = toSignal(
    this.activePlayground$
  );

  public readonly hasLost = toSignal(
    this.activePlayground$.pipe(
      filter((playground) => playground !== undefined),
      switchMap(playground => playground.hasLost),
      filter((hasWon) => hasWon),
      tap(() => this._gameState.endRound())
    )
  )

  public readonly hasWon = toSignal(
    this.activePlayground$.pipe(
      filter((playground) => playground !== undefined),
      switchMap(playground => playground.hasWon),
      filter((hasWon) => hasWon),
      tap(() => this._gameState.endRound())
    )
  )

  public ngOnInit(){
    const settings = this._settings.settingsForm.value;
    if (settings.seed == null || settings.x == null || settings.y == null) {
      this._router.navigate(['/settings'])
      return;
    }
    this.generatePlaygroundByConfig({
      seed: settings.seed,
      x: settings.x,
      y: settings.y,
    });
    this.startGame();
  }

  public generatePlaygroundByConfig(config: {y: number, x: number, seed: string}): void {
    const {seed, y, x} = config;
    const generator = new SeedRandom(
      seed
    );
    const playground = new PlaygroundGenerator(
      generator
    ).generatePlayground({
      dimensions: {
        width: x,
        height: y
      }
    })
    this.activePlayground$.next(playground);
    this._gameState.gameMetadata.next(playground.meta);
    this._gameState.minesCount.next(playground.meta.totalMines);
  }

  private startGame() {
    this._gameState.startRound();
  }

}
