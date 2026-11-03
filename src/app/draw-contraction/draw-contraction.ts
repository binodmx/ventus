import { Image, Surface, Path, Text, Group, geometry } from '@progress/kendo-drawing';

const { Rect, Point, Size, transform } = geometry;

export function drawContraction(surface: Surface, originalHCO: number, originalHCI: number, originalLCN: number) {
  const LRC: number = 0.93425;
  const ARC: number = 9.419;
  const sqrtARC: number = Math.sqrt(ARC);
  const HCO: number = 40;
  const HCI: number = HCO * sqrtARC;
  const x0: number = 60;
  const y0: number = 0;
  const LCN: number = LRC * HCI;
  const x1: number = x0 + LCN;
  const y1: number = y0 + (HCI - HCO)/2
  const contraction = new Path({stroke: {color: "#9999b6", width: 2}});
  contraction.moveTo(x0, y0)
  .curveTo([x0, y0], [x0+LCN/4, y0], [x0+LCN/2, y1/2])
  .curveTo([x0+LCN/2, y1/2], [x0+3*LCN/4, y1], [x0+LCN, y1])
  .lineTo(x0+LCN, y1 + HCO)
  .curveTo([x0+LCN, y1 + HCO], [x0+3*LCN/4, y1 + HCO], [x0+LCN/2, y1+HCO+(HCI-(y1+HCO))/2])
  .curveTo([x0+LCN/2, y1+HCO+(HCI-(y1+HCO))/2], [x0+LCN/4, HCI], [x0, HCI])
  .close();

  // HCI label
  const hciLabel = new Text(
    String(originalHCI) + "m",
    new Point(0, HCI/2-10),
    { font: "15px Arial" }
  );

  // HCO label
  const hcoLabel = new Text(
    String(originalHCO) + "m",
    new Point(x1 + 5, HCI/2-10),
    { font: "15px Arial" }
  );  

  // LCN label 
  const lcnLabel = new Text(
    String(originalLCN) + "m",
    new Point(x0+LCN/3, HCI+12),
    { font: "15px Arial" }
  );

  const lcnPath = new Path({stroke: {color: "#9999b6", width: 1}});
  lcnPath.moveTo(x0, y0+HCI+10)
  .lineTo(x1, HCI+10)

  const lcnPath1 = new Path({stroke: {color: "#9999b6", width: 1}});
  lcnPath1.moveTo(x0, y0+HCI+5)
  .lineTo(x0, y0+HCI+15)

  const lcnPath2 = new Path({stroke: {color: "#9999b6", width: 1}});
  lcnPath2.moveTo(x1, y0+HCI+5)
  .lineTo(x1, y0+HCI+15)

  // Place all the shapes in a group
  const group = new Group();
  // group.append(path, text);
  group.append(contraction, hcoLabel, hciLabel, lcnLabel, lcnPath, lcnPath1, lcnPath2);

  // Translate the group
  group.transform(
    transform().translate(10, 10)
  );

  // Render the group on the surface
  surface.draw(group);
}