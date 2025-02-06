import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-no-data-card',
  standalone: true,
  imports: [],
  templateUrl: './no-data-card.component.html',
  styleUrl: './no-data-card.component.scss',
})
export class NoDataCardComponent {
  @Input() title: string = 'No data found';
  @Output() cardAction = new EventEmitter<any>();

  onClickAction(e: Event) {
    this.cardAction.emit(e);
  }
}
