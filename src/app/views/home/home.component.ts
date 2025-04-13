import { Component, OnInit } from '@angular/core';
import{HttpClient} from '@angular/common/http'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  eventos: any[]

  constructor(private httpClient: HttpClient){
    this.eventos=[]
    
  }
  ngOnInit(): void {
    this.httpClient.get("assets/data/events.json").subscribe((data: any) => {
      this.eventos = data;
    })
  }
}
