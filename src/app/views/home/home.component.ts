import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import{HttpClient} from '@angular/common/http'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  eventos: any[]

  constructor(private httpClient: HttpClient, private cdr: ChangeDetectorRef){
    this.eventos=[]
    
  }
  ngOnInit(): void {
    this.getEvents()
  }

  getEvents() {
    this.httpClient.get("assets/data/events.json").subscribe((data: any) => {
      this.eventos = data;
      this.cdr.detectChanges()
    })
  }
}
