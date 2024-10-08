import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, type OnInit } from '@angular/core';
import { GameStateService } from '../../domain/services/game-state.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { TimePipe } from '../../../time/time.pipe';

@Component({
  selector: 'app-info-bar',
  standalone: true,
  imports: [
    TimePipe
  ],
  templateUrl: './info-bar.component.html',
  styleUrl: './info-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoBarComponent {
  private readonly _gameState = inject(GameStateService);

  public readonly minesCount = toSignal(
    this._gameState.minesCount
  )

  public readonly time = toSignal(
    this._gameState.timeMS
  )
}
