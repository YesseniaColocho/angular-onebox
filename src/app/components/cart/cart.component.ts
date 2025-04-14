import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { formatDate } from 'src/app/utils/helpers';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {

  @Input() events: any
  @Output() remove = new EventEmitter();

  get eventsArray(): any[] {
    return Object.values(this.events)
  }

  removeSession(id: string, date: string) {
    this.remove.emit({id, date});
  }

  formatDate(date:string) {
    return formatDate(date)
  }
}
