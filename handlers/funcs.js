
import {abs, eps, sqr} from "./consts";
import {P} from "./ClassPoint";
import {L} from "./ClassL";

/*
*
* Принимает c класса С и l класса L
* возвращает результат долгих и сложных вычислений типа массив (?)
 */
export const crossCircleAndLine = (c, l) => {
    const al = l.b;
    const be = -l.a;

    let res = []
    let x0;
    let y0;

    if (abs(l.a) < abs(l.b)){
        x0 = 0;
        y0 = -l.c/l.b;
    } else {
        y0 = 0;
        x0 = -l.c / l.a;
    }
    const A = sqr(al) + sqr(be);
    const B = 2 * al * (x0 - c.o.x) + 2 * be * (y0 - c.o.y);
    const C = sqr(x0-c.o.x) + sqr(y0-c.o.y) - sqr(c.r);
    let d = B * B - 4 * A * C;

    if (d < -eps) return res;
    if (d < 0) d = 0;

    let t = (-B + Math.sqrt(d)) / (2 * A);
    res.push(new P(x0 + al * t,y0 + be * t));

    t = (-B - Math.sqrt(d)) / (2 * A);
    res.push(new P(x0 + al * t,y0 + be * t));

    return res
}

export const crossTwoCircles = (c1, c2) => {
    const a = 2 * (c2.o.x - c1.o.x);
    const b = 2 * (c2.o.y - c1.o.y);
    const c = sqr(c2.r) - sqr(c1.r) + sqr(c1.o.x) - sqr(c2.o.x) + sqr(c1.o.y) - sqr(c2.o.y);
    return crossCircleAndLine(c1, new L(a, b, c))
}

export const sgn = (x) => {
    if (x > eps) return 1;
    if (x < -eps) return -1;
    return 0;
}