import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, type OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SettingsService } from '../../domain/settings/domain/services/settings.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent {
  private readonly _router = inject(Router);
  public settingsService = inject(SettingsService);

  public readonly isFormValid = toSignal(
    this.settingsService.isFormValid$
  )

  public ngOnInit(): void {
    this.settingsService.resetSettings();
  }


  public resetSettings(): void {
    this.settingsService.resetSettings();
  }

  public randomSeed() {
    this.settingsService.generateSeed();
  }

  public startGame() {
    if(!this.isFormValid()) return;
    this._router.navigateByUrl('/game', {})
  }
}
