import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Subject, takeUntil } from 'rxjs';
import { PlaygroundGenerationMeta } from '../../../playground/domain/models/playground.model';

@Injectable({
  providedIn: 'root'
})
export class GameStateService {
  public readonly gameOver = new BehaviorSubject(false);
  public readonly gameWon = new BehaviorSubject(false);
  public readonly minesCount = new BehaviorSubject<number>(0);
  public readonly timeMS = new BehaviorSubject<number>(0);
  public readonly gameMetadata = new BehaviorSubject<PlaygroundGenerationMeta | null>(null);
  private readonly timerReset = new Subject<boolean>();


  public startRound() {
    this.timerReset.next(true);
    this.startRoundTimer()
  }

  private startRoundTimer() {
    console.log('Starting timer...')
    interval(1000).pipe(
      takeUntil(this.timerReset),
    ).subscribe((count) => {
      this.timeMS.next(count * 1000)
    })
  }

  public endRound() {
    this.timerReset.next(true);
  }
}
