import { Image, Surface, Path, Text, Group, geometry } from '@progress/kendo-drawing';

const { Rect, Point, Size, transform } = geometry;

export function drawTestSection(surface: Surface, originalHCO: number, originalLTS: number) {
  const HCO: number = 40;
  const LTS: number = 4 * HCO;
  const x0: number = 50;
  const y0: number = 0;
  const testSection = new Path({stroke: {color: "#9999b6", width: 2}});
  testSection.moveTo(x0, y0)
  .lineTo(x0+LTS, y0)
  .lineTo(x0+LTS, y0 + HCO)
  .lineTo(x0, y0 + HCO)
  .close();

  // HCO label
  const hcoLabel = new Text(
    String(originalHCO) + "m",
    new Point(0, HCO/2-10),
    { font: "15px Arial" }
  );


  // LTS label 
  const ltsLabel = new Text(
    String(originalLTS) + "m",
    new Point(x0+LTS/3, HCO+12),
    { font: "15px Arial" }
  );

  const ltsPath = new Path({stroke: {color: "#9999b6", width: 1}});
  ltsPath.moveTo(x0, y0+HCO+10)
  .lineTo(x0+LTS, y0+HCO+10)

  const ltsPath1 = new Path({stroke: {color: "#9999b6", width: 1}});
  ltsPath1.moveTo(x0, y0+HCO+5)
  .lineTo(x0, y0+HCO+15)

  const ltsPath2 = new Path({stroke: {color: "#9999b6", width: 1}});
  ltsPath2.moveTo(x0+LTS, y0+HCO+5)
  .lineTo(x0+LTS, y0+HCO+15)

  // Place all the shapes in a group
  const group = new Group();
  // group.append(path, text);
  group.append(testSection, hcoLabel, ltsLabel, ltsPath, ltsPath1, ltsPath2);

  // Translate the group
  group.transform(
    transform().translate(10, 10)
  );

  // Render the group on the surface
  surface.draw(group);
}