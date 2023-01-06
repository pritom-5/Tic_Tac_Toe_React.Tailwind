import { crossSvg, tickSvg } from "../assets/svg";

export default function svgPicker(value) {
  let svg;
  if (value === 1) {
    svg = crossSvg;
  } else if (value === 2) {
    svg = tickSvg;
  } else {
    svg = null;
  }
  return svg;
}
