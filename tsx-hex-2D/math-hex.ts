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
        return new HexPxPos(this.width / 2, this.height / 2);
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
 * - Converts to pixel coordinates (x, y) at top left of hex's containing rect.
 */
export class HexCubePos extends Vec3 {
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
                return new HexPxPos(x, y)
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
                return new HexPxPos(x, y)
                    .scaled(hexSize.circumradius)
                    .minus(hexSize.center);
            }
        }
    }

    /**
     * Returns a new HexCubePos by running a function on all coordinates
     * then fixing them to satisfy the requirement: q + r + s == 0.
     */
    op<T>(
        func: (coord: number, ...extraArgs: T[]) => number,
        ...extraArgs: T[]
    ) {
        let q = func(this.q, ...extraArgs);
        let r = func(this.r, ...extraArgs);
        let s = func(this.s, ...extraArgs);

        const qDiff = Math.abs(q - this.q);
        const rDiff = Math.abs(r - this.r);
        const sDiff = Math.abs(s - this.s);

        if (qDiff > rDiff && qDiff > sDiff) q = -r - s;
        else if (rDiff > sDiff) r = -q - s;
        else s = -q - r;

        return new (Vec3.getCtor(this))(q, r, s) as this;
    }

    /**
     * Returns a new HexCubePos by rounding all coordinates
     * then fixing them to satisfy the requirement: q + r + s == 0.
     */
    override rounded(): this {
        return this.op(Math.round);
    }

    /**
     * Every neighbor of (0, 0, 0)
     * in cube coordinates of a hex grid (q, r, s).
     */
    static get DIRECTIONS() {
        return HexCubePos.#DIRECTIONS;
    }

    static #DIRECTIONS = Object.freeze([
        Object.freeze(new HexCubePos(1, 0, -1)),
        Object.freeze(new HexCubePos(1, -1, 0)),
        Object.freeze(new HexCubePos(0, -1, 1)),
        Object.freeze(new HexCubePos(-1, 0, 1)),
        Object.freeze(new HexCubePos(-1, 1, 0)),
        Object.freeze(new HexCubePos(0, 1, -1)),
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
 * - Takes pixel coordinates (x, y) at top left of hex's containing rect.
 * - Converts to cube coordinates in a hex grid (q, r, s) at center of hexagon.
 */
export class HexPxPos extends Vec2 {
    toCube(hexSize: HexSize) {
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
                return new HexCubePos(q, r, s);
            }
            case HexOrientation.PointyTop: {
                const q1 = Math.sqrt(3) / 3;
                const q2 = -1 / 3;
                const r1 = 0;
                const r2 = 2 / 3;
                const q = q1 * unit.x + q2 * unit.y;
                const r = r1 * unit.x + r2 * unit.y;
                const s = -q - r;
                return new HexCubePos(q, r, s);
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
    centerCubePos: HexCubePos;

    constructor(options?: { hexSize?: HexSize; centerCubePos?: HexCubePos }) {
        this.hexSize = options?.hexSize || new HexSize(36);
        this.centerCubePos = options?.centerCubePos || new HexCubePos(0, 0, 0);
    }

    /**
     * Test if a HexCubePos is inside this.cubeMap.
     */
    abstract hitTest(hexCubePos: HexCubePos): boolean;

    /**
     * Get every hex in this pattern.
     * Returns cube coordinates in a hex grid (q, r, s) at center of hexagon.
     */
    abstract get cubeMap(): HexCubePos[];

    /**
     * Get every hex in this pattern.
     * Returns SVG viewbox coordinates (x, y) at top left of hex's containing rect.
     */
    get svgMap() {
        return this.cubeMap.map((hexCubePos) => hexCubePos.toPx(this.hexSize));
    }

    get svgViewBox() {
        const centerSvgPos = this.centerCubePos
            .toPx(this.hexSize)
            .plus(this.hexSize.center);
        const minX = -this.svgWidth / 2 + centerSvgPos.x;
        const minY = -this.svgHeight / 2 + centerSvgPos.y;
        return `${minX} ${minY} ${this.svgWidth} ${this.svgHeight}`;
    }

    abstract get svgWidth(): number;
    abstract get svgHeight(): number;
}

/**
 * A math struct.
 * Assembles an array of hexagon coordinates.
 * Calculates SVG measurements.
 */
export abstract class HexPatternRadial extends HexPattern {
    constructor(options?: {
        radiusHexes?: number;
        hexSize?: HexSize;
        centerCubePos?: HexCubePos;
    }) {
        super({
            hexSize: options?.hexSize,
            centerCubePos: options?.centerCubePos,
        });
        this.radiusHexes = options?.radiusHexes || 0;
    }

    #radiusHexes = 0;
    get radiusHexes() {
        return this.#radiusHexes;
    }
    set radiusHexes(val: number) {
        if (val < 0) throw new Error("Ring radius can't be negative.");
        this.#radiusHexes = val;
    }

    override get svgWidth() {
        switch (this.hexSize.orientation) {
            default:
            case HexOrientation.FlatTop:
                return this.hexSize.width * (1 + this.radiusHexes * 1.5);
            case HexOrientation.PointyTop:
                return this.hexSize.width * (1 + this.radiusHexes * 2);
        }
    }

    override get svgHeight() {
        switch (this.hexSize.orientation) {
            default:
            case HexOrientation.FlatTop:
                return this.hexSize.height * (1 + this.radiusHexes * 2);
            case HexOrientation.PointyTop:
                return this.hexSize.height * (1 + this.radiusHexes * 1.5);
        }
    }
}

/**
 * A math struct.
 * Assembles a hollow ring of hexagon coordinates.
 * Calculates SVG measurements.
 * - Radius 0: Single full hexagon in center.
 * - Radius 1: Empty center hex. 6 full hexes around.
 * - Radius 2: Empty center hex. 6 empty hexes around. 12 full hexes around.
 * - etc.
 */
export class HexRing extends HexPatternRadial {
    override get cubeMap() {
        if (this.radiusHexes < 0)
            throw new Error("Can't get ring at negative radius.");
        if (this.radiusHexes === 0) {
            return [this.centerCubePos.copy()];
        }

        const stepsPerDirection = this.radiusHexes;
        const directionFromCenter = HexCubePos.DIRECTIONS[4];
        const offsetFromCenter = directionFromCenter.scaled(this.radiusHexes);
        const start = this.centerCubePos.plus(offsetFromCenter);

        const results: HexCubePos[] = [];
        let ringPosition = start;

        for (const direction of HexCubePos.DIRECTIONS) {
            for (let _ = 0; _ < stepsPerDirection; _++) {
                results.push(ringPosition);
                ringPosition = ringPosition.plus(direction);
            }
        }
        return results;
    }

    override hitTest(hexCubePos: HexCubePos) {
        const margin = 0.35;
        let r = 0;
        let s = 0;
        for (const [_, val] of Object.entries(hexCubePos)) {
            r = Math.max(r, Math.abs(val));
            s += val;
        }
        if (r < this.radiusHexes - margin) return false;
        if (r > this.radiusHexes + margin) return false;
        if (s != 0) return false;
        return true;
    }
}

/**
 * A math struct.
 * Assembles a full radial grid of hexagon coordinates.
 * Calculates SVG measurements.
 * - Radius 0: Single full hexagon in center.
 * - Radius 1: Full center hex. 6 full hexes around.
 * - Radius 2: Full center hex. 6 full hexes around. 12 full hexes around.
 * - etc.
 */
export class HexSpiral extends HexPatternRadial {
    override get cubeMap() {
        if (this.radiusHexes < 0)
            throw new Error("Can't get spiral of negative radius.");

        const results: HexCubePos[] = [];
        for (let ringRadius = 0; ringRadius <= this.radiusHexes; ringRadius++) {
            const ring = new HexRing({
                radiusHexes: ringRadius,
                hexSize: this.hexSize,
                centerCubePos: this.centerCubePos,
            });
            results.push(...ring.cubeMap);
        }
        return results;
    }

    override hitTest(hexCubePos: HexCubePos) {
        const margin = 0.35;
        let r = 0;
        let s = 0;
        for (const [_, val] of Object.entries(hexCubePos)) {
            r = Math.max(r, Math.abs(val));
            s += val;
        }
        if (r > this.radiusHexes + margin) return false;
        if (s != 0) return false;
        return true;
    }
}

// ##################################################################### //
// #endregion
// ##################################################################### //
