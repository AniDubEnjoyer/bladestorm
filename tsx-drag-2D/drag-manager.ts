"use strict";
import type MoveNode from "./move-node.ts";

/**
 * Global singleton to track currently dragged element.
 */
export default class DragManager {
    // ##################################################################### //
    // #region Mutable Config
    // ##################################################################### //

    /** Offsets dragged element from pointer by a multiple of elem width. */
    static offsetX = -0.5;
    /** Offsets dragged element from pointer by a multiple of elem height. */
    static offsetY = -0.5;

    // ##################################################################### //
    // #endregion
    // ##################################################################### //
    // ##################################################################### //
    // #region Managed Objects
    // ##################################################################### //

    static #dragged: MoveNode;
    static get dragged() {
        return DragManager.#dragged;
    }

    static add(x: MoveNode) {
        if (!x) return;
        DragManager.#dragged = x;
    }

    static remove(x: MoveNode) {
        if (DragManager.#dragged != x) return;
        DragManager.#dragged = null;
    }

    static clear() {
        DragManager.#dragged = null;
    }

    // ##################################################################### //
    // #endregion
    // ##################################################################### //
    // ##################################################################### //
    // #region Internal Init
    // ##################################################################### //

    static #singleton = new DragManager();
    constructor() {
        addEventListener("pointermove", (e) => {
            if (!DragManager.#dragged) return;
            const moveVec2 = DragManager.#dragged;
            const rect = DragManager.#dragged.elem.getBoundingClientRect();
            moveVec2.x = e.clientX + rect.width * DragManager.offsetX;
            moveVec2.y = e.clientY + rect.height * DragManager.offsetY;
        });
    }

    // ##################################################################### //
    // #endregion
    // ##################################################################### //
}
