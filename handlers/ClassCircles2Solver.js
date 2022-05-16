import {P} from "./ClassPoint";
import {abs, eps, pi, sqr} from "./consts";
import {crossCircleAndLine, crossTwoCircles, sgn} from './funcs'
import {C} from "./ClassC.js";
import {getLine} from "./getLinePoint";

export class Circles2Solver{
    constructor(buben) {
        this.buben = buben;
    }
    getPoint(x) {
        let newP = new P(this.c1.r,0).rotate(x);
        return this.c1.o.plus(newP)
    }
    getSide(x) {
        const p = this.getPoint(x);
        const to = []; // массив с точками
        const circles = [this.c2, this.c3];
        for (let t = 0; t < 2; t++) {
            let c = circles[t];
            let d = p.minus(c.o).len();
            let l = Math.sqrt(Math.max(0, sqr(d)-sqr(c.r)));
            if (l < eps) continue;
            let add = crossTwoCircles(new C(p,l),c); // массив с точками
            for (let i = 0; i < add.length; i++) {
                to.push(add[i]);
            }
        }
        if (to.length === 0) return [];
        let l = 0, r = 0;
        for (let i = 0; i < to.length; i++){
            if ( (to[i].minus(p)).multP( (to[l].minus(p)) ) < -eps ) l=i;
            if ( (to[i].minus(p)).multP( (to[r].minus(p)) ) > eps ) r=i;
        }
        console.assert(l !== r);
        let tmp = crossCircleAndLine(this.c1, getLine(p, to[l]));
        console.assert(tmp.length === 2);
        let p1 = tmp[0].plus(tmp[1]).minus(p); // вычитают точку из точки (?)
        tmp = crossCircleAndLine(this.c1, getLine(p, to[r]));
        if (tmp.length !== 2) {
            p.save();
            to[r].save();
        }
        console.assert(tmp.length === 2);
        let p2 = tmp[0].plus( tmp[1]).minus(p);
        let res = [];
        res.push(p1);
        res.push(p2);
        return res;
    }

    getValue(x) {
        let p = this.getPoint(x);
        let tmp = this.getSide(x);
        if (tmp.length !== 2) return -1e100;
        let p1 = tmp[0];
        let p2 = tmp[1];
        let line = getLine(p1,p2).norm();
        let res = 1e100;
        const circles = [this.c2, this.c3];
        for (let t = 0; t < 2; t++) {
            let c = circles[t]; // current circle
            let cur;
            let d = abs(line.getValue(c.o));
            if (sgn(line.getValue(c.o)) === sgn(line.getValue(p))) {
                cur = d
            } else {
                cur = -d;
            }
            cur -= c.r;
            res = Math.min(res, cur);
        }
        return res;
    }

    // findMinValue(l, r) {
    //     let res = []
    //     for (let step = 0; step < 50; step++) {
    //         let len = r-l;
    //         let m1 = l + len / 3;
    //         let m2 = r - len / 3;
    //         let v1 = this.getValue(m1);
    //         let v2 = this.getValue(m2);
    //         if (v1<v2) {
    //             l = m1;
    //         } else {
    //             r = m2;
    //         }
    //         let x = r;
    //         res[0] = x;
    //         res[1] = this.getValue(x);
    //     }
    //     return res;
    // }

    getValidTriangle( _c1, _c2, _c3) {
        // debugger
    console.assert(_c1.containss(_c2) && _c1.containss(_c3));
        this.c1 = _c1;
        this.c2 = _c2;
        this.c3 = _c3;
        let res = []
    for (let i = 0; i < this.buben - 1; i++) {
        // let l = Math.floor(2 * pi / this.buben * i);
        // let r = Math.floor(2 * pi / this.buben * (i + 1));
        let l = 2 * pi / this.buben * i;
        let r = 2 * pi / this.buben * (i + 1);
        // let [x, minVal] = this.findMinValue(l, r);
        // console.log('min', x, minVal)
        let minVal;
        for (let step = 0; step < 50; step++) {
            console.count();
            let len = r - l;
            let m1 = l + len / 3;
            let m2 = r - len / 3;
            let v1 = this.getValue(m1);
            let v2 = this.getValue(m2);
            if (v1<v2) {
                l = m1;
            } else {
                r = m2;
            }
            let x = r;
            minVal = this.getValue(x);
            if ( minVal > -eps) {
                res = this.getSide(x);
                res.push(this.getPoint(x)); // записываем в массив найденную точку
                if (!this.checkTriangle(res)) {
                    console.log('botva');
                }
            }
        }
    }
    return res;
    }

    checkTriangle(p) {
    let eps = 1e-5;
    console.assert(p.length === 3);
    for (let i = 0; i < 3; i++) {
        if (this.c1.o.minus(p[i]).len() > this.c1.r + eps) {
            return false;
        }
    }
    let area = 0;
    for (let i = 0; i < 3; i++) {
        area += p[i].multP(p[(i + 1) % 3]);
    }
    area = abs(area);
    const circles = [this.c2, this.c3];
    for (let t = 0; t < 2; t++) {
        let c = circles[t];
        let area2 = 0;
        for (let i=0; i<3; i++) {
            area2 += abs( (p[i].minus(c.o)).multP( (p[(i + 1) % 3].minus(c.o))) );
        }
        if (abs(area - area2) > eps) return false;
    }

    for (let t = 0; t < 2; t++) {
        let c=circles[t];
        for (let i = 0; i < 3; i++) {
            let line = getLine(p[i], p[(i + 1) % 3]).norm();
            if (abs(line.getValue(c.o))<c.r-eps) return false;
        }
    }
    return true;
    }
}