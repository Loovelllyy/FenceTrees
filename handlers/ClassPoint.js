import { abs, eps } from "./consts";

/*
*
* класс точки, принимает в себя Х и У
*
*/
export class P {
    constructor(x, y) {
        this.x = +x;
        this.y = +y;
    }

    /*
    *
    * принимает точку с координатами {x, y}
    *
    */
    plus (a) {
        return new P(this.x+a.x,this.y+a.y)
    }

    minus (a) {
        return new P(this.x - a.x,this.y - a.y)
    }

    multN (k) {
        return new P(this.x * k, this.y * k)
    }

     multP (a) {
        return this.x * a.y - this.y * a.y;
    }

    step (a) {
        return this.x * a.x + this.y * a.y;
    }

    len() {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    }

    perp() {
        return new P(this.y, -this.x)
    }

    rotate (an) {
        const c = Math.cos(an);
        const s = Math.sin(an);
        return new P(this.x * c - this.y * s,this.x * s + this.y * c);
    }

    norm() {
        const l = this.len();
        if (abs(l) < eps) return new P(this.x, this.y);
        else return new P(this.x / l, this.y / l)
    }

    same(a) {
        return Boolean(abs(this.x - a.x) < eps && abs(this.y - a.y) < eps);
    }

    load(){

    }

    save() {
        console.log('save', this.x, this.y);
    }
}

