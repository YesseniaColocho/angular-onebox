import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
@Input() evento: any

formatDate(fecha: string){
  return new Date(parseInt(fecha)).toLocaleDateString()
}
}
