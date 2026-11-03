import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-select-build-method',
  templateUrl: './select-build-method.component.html',
  styleUrls: ['./select-build-method.component.css']
})
export class SelectBuildMethodComponent implements OnInit {
  @Output() changeCurrentPageEvent = new EventEmitter<string>();
  inputParamsType: string = 'input-params-type1';

  constructor() { }

  ngOnInit(): void {
  }

  onClickBack(): void {
    this.changeCurrentPageEvent.emit('home');
  }

  onClickNext(form: NgForm): void {
    if (form.value['input-params-type'] != '') {
      this.inputParamsType = form.value['input-params-type'];
      this.changeCurrentPageEvent.emit(form.value['input-params-type']);
    }
  }

}
