import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cell-content',
  template: `{{ formattedValue }}`
})
export class CellContentComponent {
  @Input() value: any;

  get formattedValue(): string {
    if (Array.isArray(this.value)) {
      if (this.value.length > 0 && typeof this.value[0] === 'object' && 'description' in this.value[0]) {
        return this.value.map((item: any) => item.description).join(', ');
      }
      return this.value.join(', ');
    }

    return this.value ?? '';
  }
}