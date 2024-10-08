import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, signal, type OnInit } from '@angular/core';
import { Playground } from '../../../playground/domain/playground';
import { AppComponent } from '../../../../app.component';
import { BehaviorSubject, debounceTime, filter } from 'rxjs';

@Component({
  selector: 'app-control-bar',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './control-bar.component.html',
  styleUrl: './control-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControlBarComponent implements OnInit {
  public readonly playground = input.required<Playground>();
  public readonly isFlagModeActive = signal(false);
  public readonly appComponent = inject(AppComponent);
  private readonly seedUpdate$ = new BehaviorSubject<null | string>(null)

  ngOnInit(): void {
    this.seedUpdate$.pipe(
      filter((seed) => seed !== null),
      debounceTime(400),
    ).subscribe((seed) => {
      this.appComponent.generatePlaygroundBySeed(seed);
    })
    this.playground().flagModeActive$.subscribe((flagModeActive) => {
      this.isFlagModeActive.set(flagModeActive);
    })
  }

  public toggleFlagMode() {
    this.playground().toggleFlagMode();
  }
<<<<<<< Tabnine <<<<<<<
  /**//+
   * Toggles the flag mode of the playground.//+
   *//+
   * This function is responsible for toggling the flag mode of the playground,//+
   * allowing the user to mark cells as potential mines.//+
   *//+
   * @returns {void}//+
   *///+
  public toggleFlagMode(): void {//+
    this.playground().toggleFlagMode();//+
  }//+
>>>>>>> Tabnine >>>>>>>// {"conversationId":"d2633a64-465e-4772-8a2c-c9ecd6b8fd73","source":"instruct"}

  public updateSeed(value: Event) {
    console.log(value);
    //@ts-ignore
    this.seedUpdate$.next(value.target.value as string);
  }
}
