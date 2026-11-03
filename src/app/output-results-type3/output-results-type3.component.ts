import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-output-results-type3',
  templateUrl: './output-results-type3.component.html',
  styleUrls: ['./output-results-type3.component.css']
})
export class OutputResultsType3Component implements OnInit {
  @Output() changeCurrentPageEvent = new EventEmitter<string>();
  @Input() data3: number[];

  constructor() { }

  ngOnInit(): void {
  }
  
  onClickBack(): void {
    this.changeCurrentPageEvent.emit('home');
  }
}
