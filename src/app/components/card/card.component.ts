import { Component, Input } from '@angular/core';
import { formatDate } from 'src/app/utils/helpers';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() evento: any

  formatDate(date: string) {
    return formatDate(date)
  }
}
