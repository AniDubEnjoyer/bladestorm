"use strict";

export default class Vec3 {
    constructor(
        public q: number,
        public r: number,
        public s: number,
    ) {}

    copy() {
        return new (Vec3.#getCtor(this))(this.q, this.r, this.s) as this;
    }

    rounded() {
        return new (Vec3.#getCtor(this))(
            Math.round(this.q),
            Math.round(this.r),
            Math.round(this.s),
        ) as this;
    }

    plus(vec3: Vec3) {
        return new (Vec3.#getCtor(this))(
            this.q + vec3.q,
            this.r + vec3.r,
            this.s + vec3.s,
        ) as this;
    }

    minus(vec3: Vec3) {
        return new (Vec3.#getCtor(this))(
            this.q - vec3.q,
            this.r - vec3.r,
            this.s - vec3.s,
        ) as this;
    }

    scaled(factor: number) {
        return new (Vec3.#getCtor(this))(
            this.q * factor,
            this.r * factor,
            this.s * factor,
        ) as this;
    }

    descaled(divisor: number) {
        return new (Vec3.#getCtor(this))(
            this.q / divisor,
            this.r / divisor,
            this.s / divisor,
        ) as this;
    }

    static #getCtor(childClass: Vec3) {
        return childClass.constructor as new (
            q: number,
            r: number,
            s: number,
        ) => typeof childClass;
    }
}
