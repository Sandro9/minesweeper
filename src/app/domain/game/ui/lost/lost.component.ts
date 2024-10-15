import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lost',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './lost.component.html',
  styleUrl: './lost.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LostComponent {
  private readonly _router = inject(Router);

  public newGame() {
    this._router.navigateByUrl('/settings');
  }
}
