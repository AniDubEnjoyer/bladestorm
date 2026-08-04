"use strict";
import { Mat2x2, Vec2, Vec3 } from "../ts-utils/math.ts";

export enum HexOrientation {
    FlatTop,
    PointyTop,
}

// ##################################################################### //
// #region Size
// ##################################################################### //

/**
 * A math struct for pixel measurements of a hexagon.
 */
export class HexSize {
    constructor(
        /** Radius of circumscribed circle. */
        public circumradius: number,
        public orientation = HexOrientation.PointyTop,
    ) {}

    /** Radius of inscribed circle. */
    get apothem() {
        return (Math.sqrt(3) / 2) * this.circumradius;
    }

    get width() {
        switch (this.orientation) {
            default:
            case HexOrientation.FlatTop:
                return this.circumradius * 2;
            case HexOrientation.PointyTop:
                return this.apothem * 2;
        }
    }

    get height() {
        switch (this.orientation) {
            default:
            case HexOrientation.FlatTop:
                return this.apothem * 2;
            case HexOrientation.PointyTop:
                return this.circumradius * 2;
        }
    }

    get center() {
        return new Vec2(this.width / 2, this.height / 2);
    }
}

// ##################################################################### //
// #endregion
// ##################################################################### //
// ##################################################################### //
// #region Hex Position
// ##################################################################### //

/**
 * A math struct for cube coordinates in a hex grid (q, r, s),
 * and conversions to HTML node pixel coordinates (x, y).
 */
export class HexVec3 extends Vec3 {
    toPx(hexSize: HexSize) {
        const unitPx = this.toUnitPx(hexSize.orientation);
        return unitPx.scaled(hexSize.circumradius).minus(hexSize.center);
    }

    toUnitPx(orientation = HexOrientation.PointyTop) {
        switch (orientation) {
            default:
            case HexOrientation.FlatTop:
                return HexVec3.FLAT_BASIS_TO_PX.dot(new Vec2(this.q, this.r));
            case HexOrientation.PointyTop:
                return HexVec3.POINTY_BASIS_TO_PX.dot(new Vec2(this.q, this.r));
        }
    }

    /**
     * Every neighbor of (0, 0, 0),
     * in cube coordinates of a hex grid (q, r, s).
     */
    static get DIRECTIONS() {
        return HexVec3.#DIRECTIONS;
    }

    static #DIRECTIONS = Object.freeze([
        Object.freeze(new HexVec3(1, 0, -1)),
        Object.freeze(new HexVec3(1, -1, 0)),
        Object.freeze(new HexVec3(0, -1, 1)),
        Object.freeze(new HexVec3(-1, 0, 1)),
        Object.freeze(new HexVec3(-1, 1, 0)),
        Object.freeze(new HexVec3(0, 1, -1)),
    ]);

    /**
     * Change of basis matrix for flat top orientation,
     * from cube coordinates (q, r, s) to pixel coordinates (x, y).
     */
    static get FLAT_BASIS_TO_PX() {
        return HexVec3.#FLAT_BASIS_TO_PX;
    }

    static #FLAT_BASIS_TO_PX = (() => {
        const qDeltaX = 1.5;
        const qDeltaY = Math.sqrt(3) / 2;
        const rDeltaX = 0;
        const rDeltaY = Math.sqrt(3);
        const qBasisVec = Object.freeze(new Vec2(qDeltaX, qDeltaY));
        const rBasisVec = Object.freeze(new Vec2(rDeltaX, rDeltaY));
        return Object.freeze(new Mat2x2(qBasisVec, rBasisVec));
    })();

    /**
     * Change of basis matrix for pointy top orientation,
     * from cube coordinates (q, r, s) to pixel coordinates (x, y).
     */
    static get POINTY_BASIS_TO_PX() {
        return HexVec3.#POINTY_BASIS_TO_PX;
    }

    static #POINTY_BASIS_TO_PX = (() => {
        const qDeltaX = Math.sqrt(3);
        const qDeltaY = 0;
        const rDeltaX = Math.sqrt(3) / 2;
        const rDeltaY = 1.5;
        const qBasisVec = Object.freeze(new Vec2(qDeltaX, qDeltaY));
        const rBasisVec = Object.freeze(new Vec2(rDeltaX, rDeltaY));
        return Object.freeze(new Mat2x2(qBasisVec, rBasisVec));
    })();
}

// ##################################################################### //
// #endregion
// ##################################################################### //
// ##################################################################### //
// #region Pixel Position
// ##################################################################### //

/**
 * A math struct for HTML node pixel coordinates (x, y),
 * and conversions to cube coordinates in a hex grid (q, r, s).
 */
export class HexVec2 extends Vec2 {
    toHex(hexSize: HexSize, orientation = HexOrientation.PointyTop) {
        switch (orientation) {
            default:
            case HexOrientation.FlatTop:
                return HexVec2.FLAT_BASIS_TO_HEX.dot(this.toUnitPx(hexSize));
            case HexOrientation.PointyTop:
                return HexVec2.POINTY_BASIS_TO_HEX.dot(this.toUnitPx(hexSize));
        }
    }

    toUnitPx(hexSize: HexSize) {
        return this.plus(hexSize.center).descaled(hexSize.circumradius);
    }

    /**
     * Inverse of change of basis matrix for flat top orientation.
     * Goes from pixel coordinates (x, y) to cube coordinates (q, r, s).
     */
    static get FLAT_BASIS_TO_HEX() {
        return HexVec2.#FLAT_BASIS_TO_HEX;
    }

    static #FLAT_BASIS_TO_HEX = (() => {
        const xBasisVec = Object.freeze(new Vec2(2 / 3, -1 / 3));
        const yBasisVec = Object.freeze(new Vec2(0, Math.sqrt(3) / 3));
        return Object.freeze(new Mat2x2(xBasisVec, yBasisVec));
    })();

    /**
     * Inverse of change of basis matrix for pointy top orientation.
     * Goes from pixel coordinates (x, y) to cube coordinates (q, r, s).
     */
    static get POINTY_BASIS_TO_HEX() {
        return HexVec2.#POINTY_BASIS_TO_HEX;
    }

    static #POINTY_BASIS_TO_HEX = (() => {
        const xBasisVec = Object.freeze(new Vec2(Math.sqrt(3) / 3, 0));
        const yBasisVec = Object.freeze(new Vec2(-1 / 3, 2 / 3));
        return Object.freeze(new Mat2x2(xBasisVec, yBasisVec));
    })();
}

// ##################################################################### //
// #endregion
// ##################################################################### //
// ##################################################################### //
// #region Grid
// ##################################################################### //

/**
 * A math struct for a grid of hexagons.
 * It will always have at least one center hex.
 * New hexes go around the center (coordinates can be negative).
 */
export class HexGrid {
    constructor(
        /**
         * How many rings of hexes are around the center hex.
         * - If 0, the grid will have one center hex.
         * - If 1, the grid will have a center hex surrounded by 6 hexes.
         * - If 2, the grid will have a center, a ring of 6, and a ring of 12.
         * - etc.
         */
        public rings: number,
        public hexSize: HexSize,
        public center = new HexVec3(0, 0, 0),
    ) {
        if (rings < 0) throw new Error("Grid radius can't be negative.");
    }

    get viewBox() {
        const minX = -this.width / 2;
        const minY = -this.height / 2;
        return `${minX} ${minY} ${this.width} ${this.height}`;
    }

    get width() {
        switch (this.hexSize.orientation) {
            default:
            case HexOrientation.FlatTop:
                return this.hexSize.width * (1 + this.rings * 1.5);
            case HexOrientation.PointyTop:
                return this.hexSize.width * (1 + this.rings * 2);
        }
    }

    get height() {
        switch (this.hexSize.orientation) {
            default:
            case HexOrientation.FlatTop:
                return this.hexSize.height * (1 + this.rings * 2);
            case HexOrientation.PointyTop:
                return this.hexSize.height * (1 + this.rings * 1.5);
        }
    }

    /** Get every hex in this grid, in pixel coordinates (x, y). */
    get pixelMap() {
        return this.vecMap.map((hexVec3) => hexVec3.toPx(this.hexSize));
    }

    /** Get every hex in this grid, in cube coordinates (q, r, s). */
    get vecMap() {
        return this.spiral(this.rings);
    }

    /**
     * Get a ring at every radius,
     * starting at this grid's center and ending at a given radius.
     * Returns an array of cube coordinates (q, r, s).
     */
    spiral(radius: number) {
        return HexGrid.spiral(radius, this.center);
    }

    /**
     * Get every hex that is a given radius away from this grid's center.
     * Returns an array of cube coordinates (q, r, s).
     */
    ring(radius: number) {
        return HexGrid.ring(radius, this.center);
    }

    /**
     * Get a ring of hexes at every radius,
     * starting at a given center and ending at a given radius.
     * Returns an array of cube coordinates (q, r, s).
     */
    static spiral(radius: number, center = new HexVec3(0, 0, 0)): HexVec3[] {
        if (radius < 0) throw new Error("Can't get spiral of negative radius.");

        const results = [];

        for (let ringRadius = 0; ringRadius <= radius; ringRadius++)
            results.push(...HexGrid.ring(ringRadius, center));

        return results;
    }

    /**
     * Get every hex that is a given radius away from a given center.
     * Returns an array of cube coordinates (q, r, s).
     */
    static ring(radius: number, center = new HexVec3(0, 0, 0)): HexVec3[] {
        if (radius < 0) throw new Error("Can't get ring at negative radius.");
        if (radius === 0) return [center];

        const stepsPerDirection = radius;
        const directionFromCenter = HexVec3.DIRECTIONS[4];
        const offsetFromCenter = directionFromCenter.scaled(radius);
        const start = center.plus(offsetFromCenter);

        const results = [];
        let ringPosition = start;

        for (const direction of HexVec3.DIRECTIONS) {
            for (let _ = 0; _ < stepsPerDirection; _++) {
                results.push(ringPosition);
                ringPosition = ringPosition.plus(direction);
            }
        }

        return results;
    }
}

// ##################################################################### //
// #endregion
// ##################################################################### //
