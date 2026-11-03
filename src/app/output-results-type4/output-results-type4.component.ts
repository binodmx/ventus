import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-output-results-type4',
  templateUrl: './output-results-type4.component.html',
  styleUrls: ['./output-results-type4.component.css']
})
export class OutputResultsType4Component implements OnInit {
  @Output() changeCurrentPageEvent = new EventEmitter<string>();
  @Input() data4: number[];

  constructor() { }

  ngOnInit(): void {
    
  }

  onClickBack(): void {
    // console.log(this.data4);
    this.changeCurrentPageEvent.emit('home');
  }
}
