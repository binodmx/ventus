import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-outputs',
  templateUrl: './outputs.component.html',
  styleUrls: ['./outputs.component.css']
})
export class OutputsComponent implements OnInit {
  @Input() data: number[];

  constructor() { }

  ngOnInit(): void {
  }
}
