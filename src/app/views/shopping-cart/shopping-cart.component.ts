import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { modifySession, getCart } from 'src/app/js/cartStorage';
import { formatDate } from 'src/app/utils/helpers';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShoppingCartComponent {

  id: string
  cartEvents: any
  eventInfo: any
  sessions: any
  error: string


  constructor(private route: ActivatedRoute, private httpClient: HttpClient, private cdr: ChangeDetectorRef){
    this.id = ''
    this.sessions = []
    this.cartEvents = {}
    this.error = ""
    this.route.params.subscribe(params => {
      this.id = params['id']
    })
    this.getEventInfo()
  }

  getEventInfo() {
    this.cartEvents = getCart()
    this.httpClient.get(`assets/data/event-info-${this.id}.json`).subscribe({
      next: (data: any) => {
        this.eventInfo = data;
        this.sessions = data.sessions.map((session:any) => {
          let quantity = 0
          if(this.cartEvents[this.id]) {
            const cartStorageSession = this.cartEvents[this.id].sessions.find((storageSession:any) => storageSession.date === session.date)
            if(cartStorageSession) quantity = cartStorageSession.quantity
          }
          return {...session, quantity}
        })
        this.cdr.detectChanges()
      },
      error: (error) => {
        if(error.status === 404) {
          this.error = "Lo sentimos, no hay sesiones para este evento"
          this.cdr.detectChanges()
        }
      }
    })
  }

  formatDate(date:string) {
    return formatDate(date)
  }

  addSession(id:string, date: string, sum:number) {
    let modifiedSession = this.sessions.find((session:any) => session.date === date)
    let event = this.eventInfo.event

    //Para los eventos no cargados y estan en el carrito
    if(!modifiedSession) {
      modifiedSession = this.cartEvents[id].sessions.find((session:any) => session.date === date)
      event = this.cartEvents[id].event
    }
      modifiedSession.quantity += sum
      
      if(modifiedSession.quantity < 0) 
        modifiedSession.quantity = 0
      else if(modifiedSession.quantity > parseInt(modifiedSession.availability)) 
        modifiedSession.quantity = parseInt(modifiedSession.availability)
      
    
    this.cartEvents = modifySession(event, date, modifiedSession.quantity)
  }

  removeSession(payload: any) {
    this.addSession(payload.id, payload.date, -1)
  }

}
