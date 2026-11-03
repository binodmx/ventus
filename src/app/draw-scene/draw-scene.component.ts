import { Component, ElementRef, ViewChild, Input } from '@angular/core';
import { AfterViewInit, OnDestroy } from '@angular/core';
import { Surface } from '@progress/kendo-drawing';
import { drawScene } from './draw-scene';

@Component({
  selector: 'app-draw-scene',
  templateUrl: './draw-scene.component.html',
  styleUrls: ['./draw-scene.component.css']
})
export class DrawSceneComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas')
  private surfaceElement: ElementRef;
  private surface: Surface;
  @Input() HCO: number;
  @Input() HCI: number;
  @Input() LCN: number;
  @Input() LTS: number;
  @Input() HOD: number;
  @Input() LDF: number;

  public ngAfterViewInit(): void {
    drawScene(this.createSurface(), this.HCI, this.HCO, this.LCN, this.LTS, this.HOD, this.LDF);
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
