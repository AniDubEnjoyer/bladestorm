"use strict";

/**
 * A composition with a 2D element positioned using CSS absolute position.
 */
export default class MoveNode<ElemType extends HTMLElement = HTMLElement> {
    constructor(elem?: ElemType, options?: {
        on?: boolean, x?: number, y?: number
    }) {
        this.#elem = elem;
        this.#on = options?.on || false;
        this.#x = options?.x;
        this.#y = options?.y;
        if (this.on) this.#start();
    }

    #elem: ElemType | undefined;
    #on: boolean;
    #x: number | undefined;
    #y: number | undefined;

    get elem() {
        return this.#elem;
    }
    set elem(val) {
        this.#elem = val;
        if (this.#on) this.#start();
    }

    // ##################################################################### //
    // #region Status Flags
    // ##################################################################### //

    /**
     * If off, x and y stores values, but they do not affect the elem.
     * Once turned on, the elem will always match x and y.
     */
    get on() {
        return this.#on;
    }

    /**
     * When called, turns this on. The elem instantly jumps to x and y,
     * and any further mutations of x and y will automatically move the elem.
     * If x and y are missing, inits them to the elem's current position.
     */
    enable() {
        if (this.#on) return;
        this.#on = true;
        this.#start();
    }

    /**
     * Internal function that handles the logic of enable().
     * Called when first enabled, or when a new elem is set while enabled.
     */
    #start() {
        if (!this.#elem) return;
        const rect = this.#elem.getBoundingClientRect();
        const x = this.#x !== undefined ? this.#x : rect.x;
        const y = this.#y !== undefined ? this.#y : rect.y;
        this.#elem.style.left = `${x}px`;
        this.#elem.style.top = `${y}px`;
        this.#elem.style.position = "absolute";
        this.#elem.style.zIndex = "999";
    }

    // ##################################################################### //
    // #endregion
    // ##################################################################### //
    // ##################################################################### //
    // #region Position
    // ##################################################################### //

    get x() {
        return this.#x;
    }
    set x(val) {
        this.#x = val;
        if (!this.#on) return;
        if (!this.#elem) return;
        this.#elem.style.left = `${val}px`;
    }

    get y() {
        return this.#y;
    }
    set y(val) {
        this.#y = val;
        if (!this.#on) return;
        if (!this.#elem) return;
        this.#elem.style.top = `${val}px`;
    }

    move(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    moveToParent() {
        if (!this.#elem) return;
        if (!this.#elem.parentElement) return;
        const rect = this.#elem.parentElement.getBoundingClientRect();
        this.#x = rect.x;
        this.#y = rect.y;
        if (!this.#on) return;
        this.#elem.style.left = `${rect.x}px`;
        this.#elem.style.top = `${rect.y}px`;
    }

    // ##################################################################### //
    // #endregion
    // ##################################################################### //
}
