import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { fromEventPattern } from 'rxjs';

@Component({
  selector: 'app-input-params-type1',
  templateUrl: './input-params-type1.component.html',
  styleUrls: ['./input-params-type1.component.css']
})
export class InputParamsType1Component implements OnInit {
  @Output() changeCurrentPageEvent = new EventEmitter<string>();
  @Output() dataEvent = new EventEmitter<number[]>();
  data;
  clicked: boolean = false;

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  onClickBack(): void {
    this.changeCurrentPageEvent.emit('select-build-method');
  }

  onClickNext(form: NgForm): void {
    if (form.value.height < 15 || form.value.height > 150) {
      alert('Test Section Height should be between 15cm and 150cm!');
    } else if (form.value.speed < 0 || form.value.speed > 90) {
      alert('Speed should be between 0m/s and 90m/s!');
    } else {
      this.clicked = true;
      const HTS = Math.round(form.value.height)/100;
      var arc, lrc, ard, ead;
      if (HTS <= 0.6) {
        arc = 8.6393;
        lrc = 0.9227;
        ard = 3.8888;
        ead = 0.102049;
      } else {
        arc = 15.08;
        lrc = 1.0172;
        ard = 2.9634;
        ead = 0.092022;
      }
      // set speed
      this.httpClient.get(
        environment.api.setParams,
        { params: { speed: form.value.speed, arc, lrc, ard, ead } }
      ).subscribe(response => { 
        console.log(response);        
      });
      setTimeout(() => {
        // get data
        this.httpClient.get(
          environment.api.data
        ).subscribe(response => {
          this.data = response;
          for (let i = 5; i < this.data.length; i++) {
              if (+this.data[i][0] == HTS) {
                  const response = this.data[i];
                  response.push(this.data[1][8]);
                  response.push(this.data[2][8]);
                  response.push(this.data[1][5]);
                  response.push(this.data[2][5]);
                  console.log(response);
                  this.dataEvent.emit(response);
                  this.changeCurrentPageEvent.emit('output-results-type1');
                  break;
              }
          }
        });
      }, 5000);
    }
  }
}
