import { L } from './ClassL'
import {P} from "./ClassPoint";

export const getLine = (p1, p2) => {
  const x0 = p1.x;
  const y0 = p1.y;
  const al = p2.x - p1.x;
  const be = p2.y - p1.y;
  return new L(be, -al, al * y0 - be * x0);
}

export const getPoint = (l1, l2) => {
  const det = l1.a * l2.b - l1.b * l2.a;
  const det1 = -(l1.c * l2.b - l1.b * l2.c);
  const det2 = -(l1.a * l2.c - l1.c * l2.a);
  return new P(det1 / det, det2 / det);
}