import { Component, ElementRef, ViewChild, Input } from '@angular/core';
import { AfterViewInit, OnDestroy } from '@angular/core';
import { Surface } from '@progress/kendo-drawing';
import { drawContraction } from './draw-contraction';

@Component({
  selector: 'app-draw-contraction',
  templateUrl: './draw-contraction.component.html',
  styleUrls: ['./draw-contraction.component.css']
})
export class DrawContractionComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas')
  private surfaceElement: ElementRef;
  private surface: Surface;
  @Input() HCO: number;
  @Input() HCI: number;
  @Input() LCN: number;

  public ngAfterViewInit(): void {
    drawContraction(this.createSurface(), this.HCO, this.HCI, this.LCN);
  }

  public ngOnDestroy() {
    this.surface.destroy();
  }

  private createSurface(): Surface {
    // Obtain a reference to the native DOM element of the wrapper
    const element = this.surfaceElement.nativeElement;

    // Create a drawing surface
    this.surface = Surface.create(element);

    return this.surface;
  } 
}
