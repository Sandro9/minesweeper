import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, type OnInit } from '@angular/core';
import { GameStateService } from '../../../control/domain/services/game-state.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { TimePipe } from '../../../time/time.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-win',
  standalone: true,
  imports: [
    CommonModule,
    TimePipe
  ],
  templateUrl: './win.component.html',
  styleUrl: './win.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WinComponent {
  private readonly _gameService = inject(GameStateService);
  private readonly _router = inject(Router);

  public readonly timeMS = toSignal(this._gameService.timeMS);
  private readonly _meta = toSignal(this._gameService.gameMetadata);
  public readonly seed = computed(() => {
    const meta = this._meta();
    if(!meta) return 'unknown';
    return meta.seed;
  })

  public newGame() {
    this._router.navigateByUrl('/settings');
  }


}
