"use strict";
import Vec2 from "../ts-math-extends/vec2";
import Vec3 from "../ts-math-extends/vec3";

// ##################################################################### //
// #region Enums
// ##################################################################### //

export enum HexOrientation {
    FlatTop,
    PointyTop,
}

// ##################################################################### //
// #endregion
// ##################################################################### //
// ##################################################################### //
// #region Hex Size
// ##################################################################### //

/**
 * A math struct.
 * Measures a hexagon in relation to circumradius.
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
        return new HexVec2(this.width / 2, this.height / 2);
    }
}

// ##################################################################### //
// #endregion
// ##################################################################### //
// ##################################################################### //
// #region Grid Position
// ##################################################################### //

/**
 * A math struct.
 * - Takes cube coordinates in a hex grid (q, r, s) at center of hexagon.
 * - Converts to pixel coordinates (x, y) at top left of containing rectangle.
 */
export class HexVec3 extends Vec3 {
    toPx(hexSize: HexSize) {
        switch (hexSize.orientation) {
            default:
            case HexOrientation.FlatTop: {
                const x1 = 1.5;
                const x2 = 0;
                const y1 = Math.sqrt(3) / 2;
                const y2 = Math.sqrt(3);
                const x = x1 * this.q + x2 * this.r;
                const y = y1 * this.q + y2 * this.r;
                return new HexVec2(x, y)
                    .scaled(hexSize.circumradius)
                    .minus(hexSize.center);
            }
            case HexOrientation.PointyTop: {
                const x1 = Math.sqrt(3);
                const x2 = Math.sqrt(3) / 2;
                const y1 = 0;
                const y2 = 1.5;
                const x = x1 * this.q + x2 * this.r;
                const y = y1 * this.q + y2 * this.r;
                return new HexVec2(x, y)
                    .scaled(hexSize.circumradius)
                    .minus(hexSize.center);
            }
        }
    }

    /**
     * Every neighbor of (0, 0, 0)
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
}

// ##################################################################### //
// #endregion
// ##################################################################### //
// ##################################################################### //
// #region Pixel Position
// ##################################################################### //

/**
 * A math struct.
 * - Takes pixel coordinates (x, y) at top left of containing rectangle.
 * - Converts to cube coordinates in a hex grid (q, r, s) at center of hexagon.
 */
export class HexVec2 extends Vec2 {
    toHex(hexSize: HexSize) {
        const unit = this.plus(hexSize.center).descaled(hexSize.circumradius);
        switch (hexSize.orientation) {
            default:
            case HexOrientation.FlatTop: {
                const q1 = 2 / 3;
                const q2 = 0;
                const r1 = -1 / 3;
                const r2 = Math.sqrt(3) / 3;
                const q = q1 * unit.x + q2 * unit.y;
                const r = r1 * unit.x + r2 * unit.y;
                const s = -q - r;
                return new HexVec3(q, r, s);
            }
            case HexOrientation.PointyTop: {
                const q1 = Math.sqrt(3);
                const q2 = Math.sqrt(3) / 2;
                const r1 = 0;
                const r2 = 1.5;
                const q = q1 * unit.x + q2 * unit.y;
                const r = r1 * unit.x + r2 * unit.y;
                const s = -q - r;
                return new HexVec3(q, r, s);
            }
        }
    }
}

// ##################################################################### //
// #endregion
// ##################################################################### //
// ##################################################################### //
// #region Hex Patterns
// ##################################################################### //

/**
 * A math struct.
 * Assembles an array of hexagon coordinates.
 */
export abstract class HexPattern {
    hexSize: HexSize;
    center: HexVec3;

    constructor(options?: { hexSize?: HexSize; center?: HexVec3 }) {
        this.hexSize = options?.hexSize || new HexSize(36);
        this.center = options?.center || new HexVec3(0, 0, 0);
    }

    /**
     * Get every hex in this pattern.
     * Returns pixel coordinates (x, y) at top left of containing rectangle.
     */
    get pxMap() {
        return this.hexMap.map((hexVec3) => hexVec3.toPx(this.hexSize));
    }

    /**
     * Get every hex in this pattern.
     * Returns cube coordinates in a hex grid (q, r, s) at center of hexagon.
     */
    abstract get hexMap(): HexVec3[];
}

/**
 * A math struct.
 * Assembles an array of hexagon coordinates.
 */
export abstract class HexPatternRadial extends HexPattern {
    constructor(options?: {
        radius?: number;
        hexSize?: HexSize;
        center?: HexVec3;
    }) {
        super({ hexSize: options?.hexSize, center: options?.center });
        this.radius = options?.radius || 0;
    }

    #radius = 0;
    get radius() {
        return this.#radius;
    }
    set radius(val: number) {
        if (val < 0) throw new Error("Ring radius can't be negative.");
        this.#radius = val;
    }
}

/**
 * A math struct.
 * Assembles a hollow ring of hexagons.
 * - Radius 0: Single full hexagon in center.
 * - Radius 1: Empty center hex. 6 full hexes around.
 * - Radius 2: Empty center hex. 6 empty hexes around. 12 full hexes around.
 * - etc.
 */
export class HexRing extends HexPatternRadial {
    get hexMap() {
        if (this.radius < 0)
            throw new Error("Can't get ring at negative radius.");
        if (this.radius === 0) {
            return [this.center.copy()];
        }

        const stepsPerDirection = this.radius;
        const directionFromCenter = HexVec3.DIRECTIONS[4];
        const offsetFromCenter = directionFromCenter.scaled(this.radius);
        const start = this.center.plus(offsetFromCenter);

        const results: HexVec3[] = [];
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

/**
 * A math struct.
 * Assembles a full radial grid of hexagons.
 * - Radius 0: Single full hexagon in center.
 * - Radius 1: Full center hex. 6 full hexes around.
 * - Radius 2: Full center hex. 6 full hexes around. 12 full hexes around.
 * - etc.
 */
export class HexSpiral extends HexPatternRadial {
    get hexMap() {
        if (this.radius < 0)
            throw new Error("Can't get spiral of negative radius.");

        const results: HexVec3[] = [];
        for (let ringRadius = 0; ringRadius <= this.radius; ringRadius++) {
            const ring = new HexRing({
                radius: ringRadius,
                hexSize: this.hexSize,
                center: this.center,
            });
            results.push(...ring.hexMap);
        }
        return results;
    }
}

// ##################################################################### //
// #endregion
// ##################################################################### //
// ##################################################################### //
// #region Hex Grid
// ##################################################################### //

/**
 * A math struct.
 * Assembles a full radial grid of hexagons.
 * - Radius 0: Single full hexagon in center.
 * - Radius 1: Full center hex. 6 full hexes around.
 * - Radius 2: Full center hex. 6 full hexes around. 12 full hexes around.
 * - etc.
 *
 * Center at (q, r, s) == (0, 0, 0).
 * - Hexagon coordinates can be negative.
 */
export class HexGridCalc extends HexSpiral {
    get viewBox() {
        const centerPx = this.center
            .toPx(this.hexSize)
            .plus(this.hexSize.center);
        const minX = -this.width / 2 + centerPx.x;
        const minY = -this.height / 2 + centerPx.y;
        return `${minX} ${minY} ${this.width} ${this.height}`;
    }

    get width() {
        switch (this.hexSize.orientation) {
            default:
            case HexOrientation.FlatTop:
                return this.hexSize.width * (1 + this.radius * 1.5);
            case HexOrientation.PointyTop:
                return this.hexSize.width * (1 + this.radius * 2);
        }
    }

    get height() {
        switch (this.hexSize.orientation) {
            default:
            case HexOrientation.FlatTop:
                return this.hexSize.height * (1 + this.radius * 2);
            case HexOrientation.PointyTop:
                return this.hexSize.height * (1 + this.radius * 1.5);
        }
    }
}

// ##################################################################### //
// #endregion
// ##################################################################### //
