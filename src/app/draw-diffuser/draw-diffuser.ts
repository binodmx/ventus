import { Image, Surface, Path, Text, Group, geometry } from '@progress/kendo-drawing';

const { Rect, Point, Size, transform } = geometry;

export function drawDiffuser(surface: Surface, originalHCO: number, originalHOD: number, originalLDF: number) {
  const ARD: number = 2;
  const EAD: number = 0.1045766;
  const sqrtARD: number = Math.sqrt(ARD);
  const HCO: number = 40;
  const HOD: number = HCO*sqrtARD;
  const HID: number = HCO;
  const LDF: number = (HOD - HID)/Math.tan(EAD)
  const x0: number = 50;
  const y0: number = 0;
  const diffuser = new Path({stroke: {color: "#9999b6", width: 2}});
  diffuser.moveTo(x0, y0)
  .lineTo(x0+LDF, y0-(HOD-HID)/2)
  .lineTo(x0+LDF, y0-(HOD-HID)/2 + HOD)
  .lineTo(x0, y0+HCO)
  .close();

  // HCO label
  const hcoLabel = new Text(
    String(originalHCO) + "m",
    new Point(0, HCO/2-10),
    { font: "15px Arial" }
  );

  // HOD label
  const hodLabel = new Text(
    String(originalHOD) + "m",
    new Point(x0+LDF+5, HCO/2-10),
    { font: "15px Arial" }
  );


  // LDF label 
  const ldfLabel = new Text(
    String(originalLDF) + "m",
    new Point(x0+LDF/3, HCO+25),
    { font: "15px Arial" }
  );

  const ldfPath = new Path({stroke: {color: "#9999b6", width: 1}});
  ldfPath.moveTo(x0, y0+HCO+20)
  .lineTo(x0+LDF, y0+HCO+20)

  const ldfPath1 = new Path({stroke: {color: "#9999b6", width: 1}});
  ldfPath1.moveTo(x0, y0+HCO+25)
  .lineTo(x0, y0+HCO+15)

  const ldfPath2 = new Path({stroke: {color: "#9999b6", width: 1}});
  ldfPath2.moveTo(x0+LDF, y0+HCO+25)
  .lineTo(x0+LDF, y0+HCO+15)

  // Place all the shapes in a group
  const group = new Group();
  // group.append(path, text);
  group.append(diffuser, hcoLabel, hodLabel, ldfLabel, ldfPath, ldfPath1, ldfPath2);

  // Translate the group
  group.transform(
    transform().translate(10, 10)
  );

  // Render the group on the surface
  surface.draw(group);
}