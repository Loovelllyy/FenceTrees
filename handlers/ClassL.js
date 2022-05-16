import {eps, sqr} from "./consts";

export class L {
    constructor(a, b, c) {
        this.a = a;
        this.b = b;
        this.c = c;
    }
    norm() {
        const div = Math.sqrt(sqr(this.a) + sqr(this.b));
        // if (div > eps) return new L (this.a / div, this.b / div, this.c / div)
        console.assert(div > eps);
        return new L(this.a/div,this.b/div,this.c/div);
    }
    getValue(p) {
        return this.a * p.x + this.b * p.y + this.c;
    }
}
