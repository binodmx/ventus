import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'blk-vol1';
  currentPage: string = 'home';
  data1: number[];
  data2: number[];
  data3: number[];
  data4: number[];

  onChangeCurrentPage(page: string): void {
    this.currentPage = page;
  }

  onChangeData1(data1: number[]): void {
    this.data1 = data1;
  }

  onChangeData2(data2: number[]): void {
    this.data2 = data2;
  }

  onChangeData3(data3: number[]): void {
    this.data3 = data3;
  }

  onChangeData4(data4: number[]): void {
    this.data4 = data4;
  }
}
