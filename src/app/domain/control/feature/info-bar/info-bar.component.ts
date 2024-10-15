import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, input, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { AppComponent } from '../../../../app.component';
import { Playground } from '../../../playground/domain/playground';
import { TimePipe } from '../../../time/time.pipe';
import { GameStateService } from '../../domain/services/game-state.service';

@Component({
  selector: 'app-info-bar',
  standalone: true,
  imports: [
    TimePipe,
    NgClass
  ],
  templateUrl: './info-bar.component.html',
  styleUrl: './info-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoBarComponent {
  public readonly playground = input.required<Playground>();
  public readonly isFlagModeActive = signal(false);
  public readonly appComponent = inject(AppComponent);
  private readonly _gameState = inject(GameStateService);
  private readonly _destroyRef = inject(DestroyRef);

  public readonly minesCount = toSignal(
    this._gameState.minesCount
  )

  public readonly time = toSignal(
    this._gameState.timeMS
  )

  ngOnInit(): void {
    this.playground().flagModeActive$.pipe(
      takeUntilDestroyed(this._destroyRef)
    ).subscribe((flagModeActive) => {
      this.isFlagModeActive.set(flagModeActive);
    })
  }

  public toggleFlagMode(): void {
    this.playground().toggleFlagMode();
  }
}
