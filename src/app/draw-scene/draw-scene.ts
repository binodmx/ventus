import { Image, Surface, Path, Text, Group, geometry } from '@progress/kendo-drawing';

const { Rect, Point, Size, transform } = geometry;

export function drawScene(surface: Surface, originalHCI: number, originalHCO: number, originalLCN: number, originalLTS: number, originalHOD: number, originalLDF: number) {
  // contraction
  const LRC: number = 0.93425;
  const ARC: number = 9.419;
  const sqrtARC: number = Math.sqrt(ARC);
  const HCO: number = 40;
  const x0 = 60;
  const y0 = 0;
  const HCI: number = HCO*sqrtARC;
  const LCN: number = LRC*HCI;
  const x1: number = x0+LCN;
  const y1: number = y0+(HCI-HCO)/2;
  const contraction = new Path({stroke: {color: "#9999b6", width: 2}});
  contraction.moveTo(x0, y0)
  .curveTo([x0, y0], [x0+LCN/4, 0], [x0+LCN/2, y1/2])
  .curveTo([x0+LCN/2, y1/2], [x0+3*LCN/4, y1], [x0+LCN, y1])
  .lineTo(x0+LCN, y1 + HCO)
  .curveTo([x0+LCN, y1+HCO], [x0+3*LCN/4, y1+HCO], [x0+LCN/2, y1+HCO+(HCI-(y1+HCO))/2])
  .curveTo([x0+LCN/2, y1+HCO+(HCI-(y1+HCO))/2], [x0+LCN/4, y0+HCI], [x0, y0+HCI])
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
    new Point(x0+LCN/4, HCI+12),
    { font: "15px Arial" }
  );

  const lcnPath = new Path({stroke: {color: "#9999b6", width: 1}});
  lcnPath.moveTo(x0, y0+HCI+10)
  .lineTo(x1, y0+HCI+10)

  const lcnPath1 = new Path({stroke: {color: "#9999b6", width: 1}});
  lcnPath1.moveTo(x0, y0+HCI+5)
  .lineTo(x0, y0+HCI+15)

  const lcnPath2 = new Path({stroke: {color: "#9999b6", width: 1}});
  lcnPath2.moveTo(x1, y0+HCI+5)
  .lineTo(x1, y0+HCI+15)

  // test section
  const LTS: number = 4 * HCO;
  const testSection = new Path({stroke: {color: "#9999b6", width: 2}});
  testSection.moveTo(x1, y1)
  .lineTo(x1+LTS, y1)
  .lineTo(x1+LTS, y1+HCO)
  .lineTo(x1, y1+HCO)
  .close();

  // LTS label 
  const ltsLabel = new Text(
    String(originalLTS) + "m",
    new Point(x1+LTS/4, y0+HCI+12),
    { font: "15px Arial" }
  );

  const ltsPath = new Path({stroke: {color: "#9999b6", width: 1}});
  ltsPath.moveTo(x1, y0+HCI+10)
  .lineTo(x1+LTS, y0+HCI+10)

  const ltsPath2 = new Path({stroke: {color: "#9999b6", width: 1}});
  ltsPath2.moveTo(x1+LTS, y0+HCI+5)
  .lineTo(x1+LTS, y0+HCI+15)

  // diffuser
  const ARD: number = 2;
  const EAD: number = 0.1045766;
  const sqrtARD: number = Math.sqrt(ARD);
  const HOD: number = HCO*sqrtARD;
  const HID: number = HCO;
  const LDF: number = (HOD - HID)/Math.tan(EAD)
  const diffuser = new Path({stroke: {color: "#9999b6", width: 2}});
  diffuser.moveTo(x1+LTS, y1)
  .lineTo(x1+LTS+LDF, y1-(HOD-HID)/2)
  .lineTo(x1+LTS+LDF, y1-(HOD-HID)/2+HOD)
  .lineTo(x1+LTS, y1+HCO)
  .close();

   // HOD label
   const hodLabel = new Text(
    String(originalHOD) + "m",
    new Point(x1+LTS+LDF+5, HCI/2-10),
    { font: "15px Arial" }
  );

  // LDF label 
  const ldfLabel = new Text(
    String(originalLDF) + "m",
    new Point(x1+LTS+LDF/4, HCI+12),
    { font: "15px Arial" }
  );

  const ldfPath = new Path({stroke: {color: "#9999b6", width: 1}});
  ldfPath.moveTo(x1+LTS, y0+HCI+10)
  .lineTo(x1+LTS+LDF, y0+HCI+10)

  const ldfPath2 = new Path({stroke: {color: "#9999b6", width: 1}});
  ldfPath2.moveTo(x1+LTS+LDF, y0+HCI+5)
  .lineTo(x1+LTS+LDF, y0+HCI+15)

  // Place all the shapes in a group
  const group = new Group();
  // group.append(path, text);
  group.append(contraction, testSection, diffuser, hciLabel, hcoLabel, lcnLabel, lcnPath, lcnPath1, lcnPath2, ltsLabel, ltsPath, ltsPath2, hodLabel, ldfLabel, ldfPath, ldfPath2);

  // Translate the group
  group.transform(
    transform().translate(10, 10)
  );

  // Render the group on the surface
  surface.draw(group);
}
