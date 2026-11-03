import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-input-params-type3',
  templateUrl: './input-params-type3.component.html',
  styleUrls: ['./input-params-type3.component.css']
})
export class InputParamsType3Component implements OnInit {
  @Output() changeCurrentPageEvent = new EventEmitter<string>();
  @Output() dataEvent = new EventEmitter<number[]>();
  clicked: boolean = false;
  data;

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  onClickBack(): void {
    this.changeCurrentPageEvent.emit('home');
  }

  onClickNext(form: NgForm): void {
    this.clicked = true;
    const inletArea = (form.value.inletHeight/100) * (form.value.inletHeight/100);
    const outletArea = (form.value.outletHeight/100) * (form.value.outletHeight/100);
    const areaRatio = inletArea / outletArea;
    const lengthRatio = (form.value.length/100) / (form.value.outletHeight/100);

    this.httpClient.get(
      environment.api.contraction
    ).subscribe(response => {
        this.data = response;

        // declare and initialize lower/upper boundaries
        let prevAreaRatio = 3.6;
        let nextAreaRatio = 16;
        let prevLengthRatio = 0.45;
        let nextLengthRatio = 2;

        // check validity
        if (areaRatio < prevAreaRatio || nextAreaRatio < areaRatio || lengthRatio < prevLengthRatio || nextLengthRatio < lengthRatio) {
          alert('Invalid data!');
          this.clicked = false;
          throw error('Invalid data!')
        }

        // find prev and next ratios
        for (let i = 0; i < this.data.length; i++) {
          const currData = this.data[i];
          if (+currData[0] < areaRatio && +currData[0] > prevAreaRatio) {
            prevAreaRatio = +currData[0];
          }
          if (+currData[0] > areaRatio && +currData[0] < nextAreaRatio) {
            nextAreaRatio = +currData[0];
          }
          if (+currData[1] < lengthRatio && +currData[1] > prevLengthRatio) {
            prevLengthRatio = +currData[1];
          }
          if (+currData[1] > lengthRatio && +currData[1] < nextLengthRatio) {
            nextLengthRatio = +currData[1];
          }
        }

        // declare prev/next y values
        let prevYForPrevLR;
        let nextYForPrevLR;
        let prevYForNextLR;
        let nextYForNextLR;

        for (let i = 0; i < this.data.length; i++) {
          const currData = this.data[i];
          if (+currData[0] === prevAreaRatio && +currData[1] === prevLengthRatio) {
            prevYForPrevLR = currData.slice(2);
          }
          if (+currData[0] === nextAreaRatio && +currData[1] === prevLengthRatio) {
            nextYForPrevLR = currData.slice(2);
          }
          if (+currData[0] === prevAreaRatio && +currData[1] === nextLengthRatio) {
            prevYForNextLR = currData.slice(2);
          }
          if (+currData[0] === nextAreaRatio && +currData[1] === nextLengthRatio) {
            nextYForNextLR = currData.slice(2);
          }
        }

        const yForPrevLR = this.add(this.mul(this.div(this.sub(nextYForPrevLR, prevYForPrevLR), (nextAreaRatio - prevAreaRatio)), (areaRatio - prevAreaRatio)), prevYForPrevLR);
        const yForNextLR = this.add(this.mul(this.div(this.sub(nextYForNextLR, prevYForNextLR), (nextAreaRatio - prevAreaRatio)), (areaRatio - prevAreaRatio)), prevYForNextLR);
        const y: number[] = this.add(this.mul(this.div(this.sub(yForNextLR, yForPrevLR), (nextLengthRatio - prevLengthRatio)), (lengthRatio - prevLengthRatio)), yForPrevLR);

        y.push(form.value.inletHeight/100);
        y.push(form.value.outletHeight/100);
        y.push(form.value.length/100);
        // y.push(form.value.outletHeight*Math.sqrt((nextAreaRatio+prevAreaRatio)/2));
        // y.push(form.value.outletHeight);
        // y.push(form.value.outletHeight*Math.sqrt((nextAreaRatio+prevAreaRatio)/2)*((prevLengthRatio+nextLengthRatio)/2));

        this.dataEvent.emit(y);
        this.changeCurrentPageEvent.emit('output-results-type3');
      }, error => {
        console.log(error);
      }
    );
  }

  add(arr1: number[], arr2: number[]): number[] {
    let arr: number[] = [];
    for (let i = 0; i < arr1.length; i++) {
      arr.push(+arr1[i] + +arr2[i]);
    }
    return arr;
  }

  sub(arr1: number[], arr2: number[]): number[] {
    let arr: number[] = [];
    for (let i = 0; i < arr1.length; i++) {
      arr.push(+arr1[i] - +arr2[i]);
    }
    return arr;
  }

  mul(arr1: number[], n: number): number[] {
    let arr: number[] = [];
    for (let i = 0; i < arr1.length; i++) {
      arr.push(+arr1[i] * +n);
    }
    return arr;
  }

  div(arr1: number[], n: number): number[] {
    let arr: number[] = [];
    for (let i = 0; i < arr1.length; i++) {
      if (n !== 0) {
        arr.push(+arr1[i] / +n);
      } else {
        arr.push(0);
      }
    }
    return arr;
  }
}
