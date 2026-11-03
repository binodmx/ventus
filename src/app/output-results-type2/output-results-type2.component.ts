import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { drawDOM, exportPDF, DrawOptions, Group, pdf, Path, Text } from '@progress/kendo-drawing';
import { saveAs } from '@progress/kendo-file-saver';

@Component({
  selector: 'app-output-results-type2',
  templateUrl: './output-results-type2.component.html',
  styleUrls: ['./output-results-type2.component.css']
})
export class OutputResultsType2Component implements OnInit {
  @Input() data2: number[];
  @Output() changeCurrentPageEvent = new EventEmitter<string>();
  expandAll: boolean = false;

  constructor() { }

  ngOnInit(): void {

  }

  onClickBack(): void {
    this.changeCurrentPageEvent.emit('home');
  }

  onClickDownload(element): void {
    this.expandAll = false;
    this.expandAll = true;
    setTimeout(() => {
      console.log('Downloading pdf...');
      const options = <any> { paperSize: "A2", landscape: false };
      this.exportElement(element, options);
      this.expandAll = false;
    }, 2000);
  }

  exportElement(element: HTMLElement, options: DrawOptions) {
    drawDOM(element, options).then((group: Group) => {
        return exportPDF(group, options);
    }).then((dataUri) => {
        saveAs(dataUri, 'wind_tunnel.pdf');
    });
  }

}
