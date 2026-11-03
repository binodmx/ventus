import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-hs-data',
  templateUrl: './hs-data.component.html',
  styleUrls: ['./hs-data.component.css']
})
export class HsDataComponent implements OnInit {
  @Output() changeCurrentPageEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onClickBack(): void {
    this.changeCurrentPageEvent.emit('home');
  }

}
