"use strict";
import type MoveNode from "./move-node.ts";

/**
 * Global singleton to track the global active <Drag> element.
 */
class DragManager {
    // ##################################################################### //
    // #region Mutable Config
    // ##################################################################### //

    /** Offsets dragged element from pointer by a multiple of elem width. */
    offsetX = -0.5;
    /** Offsets dragged element from pointer by a multiple of elem height. */
    offsetY = -0.5;

    // ##################################################################### //
    // #endregion
    // ##################################################################### //
    // ##################################################################### //
    // #region Managed Objects
    // ##################################################################### //

    #dragged: MoveNode | null = null;
    get dragged() {
        return this.#dragged;
    }

    add(x: MoveNode) {
        this.#dragged = x;
    }

    remove(x: MoveNode) {
        if (this.#dragged != x) return;
        this.#dragged = null;
    }

    clear() {
        this.#dragged = null;
    }

    // ##################################################################### //
    // #endregion
    // ##################################################################### //
    // ##################################################################### //
    // #region Internal Init
    // ##################################################################### //

    constructor() {
        addEventListener("pointermove", (e) => {
            if (!this.#dragged) return;
            if (!this.#dragged.elem) return;
            const moveVec2 = this.#dragged;
            const rect = this.#dragged.elem.getBoundingClientRect();
            moveVec2.x = e.clientX + rect.width * this.offsetX;
            moveVec2.y = e.clientY + rect.height * this.offsetY;
        });
    }

    // ##################################################################### //
    // #endregion
    // ##################################################################### //
}

/**
 * Global singleton to track the global active <Drag> element.
 */
const DRAG_MANAGER = new DragManager();
export default DRAG_MANAGER;
