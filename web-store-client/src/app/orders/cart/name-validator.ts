import { AbstractControl, ValidationErrors } from '@angular/forms';

export function nameValidator(
  control: AbstractControl
): ValidationErrors | null {
  if (control.value != null) {
    const nameIsCorrect =
      control.value.split(' ').filter((el: string) => el !== '').length > 1;
    return nameIsCorrect ? null : { incorrectName: true };
  }
  return null;
}
