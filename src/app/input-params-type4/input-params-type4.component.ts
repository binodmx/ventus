import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-input-params-type4',
  templateUrl: './input-params-type4.component.html',
  styleUrls: ['./input-params-type4.component.css']
})
export class InputParamsType4Component implements OnInit {
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
    const areaRatio = outletArea / inletArea;
    const coneAngle = form.value.coneAngle;

    this.httpClient.get(
      'https://us-central1-blk-vol1-2f260.cloudfunctions.net/getDiffuserData'
    ).subscribe(response => {
        this.data = response;

        // declare and initialize lower/upper boundaries
        let prevAreaRatio = 1.5;
        let nextAreaRatio = 4;
        let prevConeAngle = 3;
        let nextConeAngle = 6;

        // check validity
        if (areaRatio < prevAreaRatio || nextAreaRatio < areaRatio || coneAngle < prevConeAngle || nextConeAngle < coneAngle) {
          alert('Invalid data!');
          this.clicked = false;
          throw error('Invalid data!')
        }

        // find prev and next ratios
        for (let i = 0; i < this.data.length; i++) {
          const currData = this.data[i];
          if (+currData[1] < areaRatio && +currData[1] > prevAreaRatio) {
            prevAreaRatio = +currData[1];
          }
          if (+currData[1] > areaRatio && +currData[1] < nextAreaRatio) {
            nextAreaRatio = +currData[1];
          }
          if (+currData[0] < coneAngle && +currData[0] > prevConeAngle) {
            prevConeAngle = +currData[0];
          }
          if (+currData[0] > coneAngle && +currData[0] < nextConeAngle) {
            nextConeAngle = +currData[0];
          }
        }

        // declare prev/next y values
        let prevYForPrevLR;
        let nextYForPrevLR;
        let prevYForNextLR;
        let nextYForNextLR;

        for (let i = 0; i < this.data.length; i++) {
          const currData = this.data[i];
          if (+currData[1] === prevAreaRatio && +currData[0] === prevConeAngle) {
            prevYForPrevLR = currData.slice(2);
          }
          if (+currData[1] === nextAreaRatio && +currData[0] === prevConeAngle) {
            nextYForPrevLR = currData.slice(2);
          }
          if (+currData[1] === prevAreaRatio && +currData[0] === nextConeAngle) {
            prevYForNextLR = currData.slice(2);
          }
          if (+currData[1] === nextAreaRatio && +currData[0] === nextConeAngle) {
            nextYForNextLR = currData.slice(2);
          }
        }

        const yForPrevLR = this.add(this.mul(this.div(this.sub(nextYForPrevLR, prevYForPrevLR), (nextAreaRatio - prevAreaRatio)), (areaRatio - prevAreaRatio)), prevYForPrevLR);
        const yForNextLR = this.add(this.mul(this.div(this.sub(nextYForNextLR, prevYForNextLR), (nextAreaRatio - prevAreaRatio)), (areaRatio - prevAreaRatio)), prevYForNextLR);
        const y: number[] = this.add(this.mul(this.div(this.sub(yForNextLR, yForPrevLR), (nextConeAngle - prevConeAngle)), (coneAngle - prevConeAngle)), yForPrevLR);

        y.push(form.value.inletHeight/100);
        y.push(form.value.outletHeight/100);
        y.push(form.value.coneAngle);
        // y.push(form.value.outletHeight*Math.sqrt((nextAreaRatio+prevAreaRatio)/2));
        // y.push(form.value.outletHeight);
        // y.push(form.value.outletHeight*Math.sqrt((nextAreaRatio+prevAreaRatio)/2)*((prevLengthRatio+nextLengthRatio)/2));

        this.dataEvent.emit(y);
        this.changeCurrentPageEvent.emit('output-results-type4');
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
