"use strict";

export const parity = (n: number) => n & 1;
export const mRound = (n: number, m: number) => Math.round(n / m) * m;

// ##################################################################### //
// #region 2x2 Matrix
// ##################################################################### //

export class Mat2x2 {
    constructor(
        public col0: Vec2,
        public col1: Vec2,
    ) {}

    dot(other: Vec2) {
        const x = this.col0.x * other.x + this.col0.y * other.x;
        const y = this.col1.x * other.y + this.col1.y * other.y;
        return new Vec2(x, y);
    }
}

// ##################################################################### //
// #endregion
// ##################################################################### //
// ##################################################################### //
// #region 2D Vector
// ##################################################################### //

export class Vec2 {
    constructor(
        public x: number,
        public y: number,
    ) {}

    plus(vec2: Vec2) {
        return new Vec2(this.x + vec2.x, this.y + vec2.y);
    }

    minus(vec2: Vec2) {
        return new Vec2(this.x - vec2.x, this.y - vec2.y);
    }

    scaled(factor: number) {
        return new Vec2(this.x * factor, this.y * factor);
    }

    descaled(divisor: number) {
        return new Vec2(this.x / divisor, this.y / divisor);
    }
}

// ##################################################################### //
// #endregion
// ##################################################################### //
// ##################################################################### //
// #region 3D Vector
// ##################################################################### //

export class Vec3 {
    constructor(
        public q: number,
        public r: number,
        public s: number,
    ) {}

    plus(vec3: Vec3) {
        return new Vec3(this.q + vec3.q, this.r + vec3.r, this.s + vec3.s);
    }

    scaled(factor: number) {
        return new Vec3(this.q * factor, this.r * factor, this.s * factor);
    }

    rounded() {
        return new Vec3(
            Math.round(this.q),
            Math.round(this.r),
            Math.round(this.s),
        );
    }
}

// ##################################################################### //
// #endregion
// ##################################################################### //
