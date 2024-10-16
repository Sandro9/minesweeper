import { inject, Injectable, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { map, startWith, tap } from 'rxjs';
import { generateSeed } from '../../../seed/domain/seed.generator';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private readonly _fb = inject(FormBuilder);
  private readonly defaultX = 10;
  private readonly defaultY = 10;

  public readonly settingsForm = this._fb.group({
    y: this._fb.control<number|null>(null, {
      validators: [Validators.required, Validators.min(5), Validators.max(30)]
    }),
    x: this._fb.control<number|null>(null, {
      validators: [Validators.required, Validators.min(5), Validators.max(30)]
    }),
    seed: this._fb.control<string | null>(null),
  })

  public readonly formValue$ = this.settingsForm.valueChanges.pipe(
    startWith(this.settingsForm.value),
  )

  public readonly isFormValid$ = this.formValue$.pipe(
    map((values) => Object.values(values).every((v) => v!= null) && this.settingsForm.valid)
  )

  public resetSettings(): void {
    this.settingsForm.patchValue({
      y: this.defaultY,
      x: this.defaultX,
      seed: generateSeed(20),
    });
  }

  public generateSeed(): void {
    this.settingsForm.patchValue({
      seed: generateSeed(20),
    })
  }
}
