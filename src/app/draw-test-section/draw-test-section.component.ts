import { Component, ElementRef, ViewChild, Input } from '@angular/core';
import { AfterViewInit, OnDestroy } from '@angular/core';
import { Surface } from '@progress/kendo-drawing';
import { drawTestSection } from './draw-test-section';

@Component({
  selector: 'app-draw-test-section',
  templateUrl: './draw-test-section.component.html',
  styleUrls: ['./draw-test-section.component.css']
})
export class DrawTestSectionComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas')
  private surfaceElement: ElementRef;
  private surface: Surface;
  @Input() HCO: number;
  @Input() LTS: number;

  public ngAfterViewInit(): void {
    drawTestSection(this.createSurface(), this.HCO, this.LTS);
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
