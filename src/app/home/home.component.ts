import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @Output() changeCurrentPageEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onClick(nextPage: string): void {
    this.changeCurrentPageEvent.emit(nextPage);
  }

}
