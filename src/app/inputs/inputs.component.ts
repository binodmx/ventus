import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-inputs',
  templateUrl: './inputs.component.html',
  styleUrls: ['./inputs.component.css']
})
export class InputsComponent implements OnInit {
  @Output() dataEvent = new EventEmitter<number[]>();
  data;

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm): void {
    const PI = 3.14;
    const inletArea = PI * form.value.inletHeight * form.value.inletHeight / 4;
    const outletArea = PI * form.value.outletHeight * form.value.outletHeight / 4;
    const areaRatio = inletArea / outletArea;
    const lengthRatio = form.value.outletHeight / form.value.length;

    this.httpClient.get(
      environment.api.data
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
          throw error('invalid data');
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
        const y = this.add(this.mul(this.div(this.sub(yForNextLR, yForPrevLR), (nextLengthRatio - prevLengthRatio)), (lengthRatio - prevLengthRatio)), yForPrevLR);

        this.dataEvent.emit(y);
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
