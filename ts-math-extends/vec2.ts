"use strict";

export default class Vec2 {
    constructor(
        public x: number,
        public y: number,
    ) {}

    copy() {
        return new (Vec2.#getCtor(this))(this.x, this.y) as this;
    }

    rounded() {
        return new (Vec2.#getCtor(this))(
            Math.round(this.x),
            Math.round(this.y),
        ) as this;
    }

    plus(other: Vec2) {
        return new (Vec2.#getCtor(this))(
            this.x + other.x,
            this.y + other.y,
        ) as this;
    }

    minus(other: Vec2) {
        return new (Vec2.#getCtor(this))(
            this.x - other.x,
            this.y - other.y,
        ) as this;
    }

    scaled(factor: number) {
        return new (Vec2.#getCtor(this))(
            this.x * factor,
            this.y * factor,
        ) as this;
    }

    descaled(divisor: number) {
        return new (Vec2.#getCtor(this))(
            this.x / divisor,
            this.y / divisor,
        ) as this;
    }

    static #getCtor(childClass: Vec2) {
        return childClass.constructor as new (
            ...params: ConstructorParameters<typeof Vec2>
        ) => typeof childClass;
    }
}
