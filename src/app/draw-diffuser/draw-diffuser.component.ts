import { Component, ElementRef, ViewChild, Input } from '@angular/core';
import { AfterViewInit, OnDestroy } from '@angular/core';
import { Surface } from '@progress/kendo-drawing';
import { drawDiffuser } from './draw-diffuser';

@Component({
  selector: 'app-draw-diffuser',
  templateUrl: './draw-diffuser.component.html',
  styleUrls: ['./draw-diffuser.component.css']
})
export class DrawDiffuserComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas')
  private surfaceElement: ElementRef;
  private surface: Surface;
  @Input() HCO: number;
  @Input() HOD: number;
  @Input() LDF: number;

  public ngAfterViewInit(): void {
    drawDiffuser(this.createSurface(), this.HCO, this.HOD, this.LDF);
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
