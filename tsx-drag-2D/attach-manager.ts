"use strict";
import type MoveNode from "./move-node.ts";

/**
 * Global singleton to track all currently attached elements.
 */
export default class AttachManager {
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

    static #attached: MoveNode[] = [];
    static get attached() {
        return AttachManager.#attached;
    }

    static add(x: MoveNode) {
        if (!x) return;
        AttachManager.#attached.push(x);
    }

    static splice(x: MoveNode) {
        const i = AttachManager.#attached.indexOf(x);
        if (i === -1) return;
        AttachManager.#attached.splice(i, 1);
    }

    // ##################################################################### //
    // #endregion
    // ##################################################################### //
    // ##################################################################### //
    // #region Internal Init
    // ##################################################################### //

    static #singleton = new AttachManager();
    constructor() {
        addEventListener("pointermove", (e) => {
            for (const moveVec2 of AttachManager.#attached) {
                const rect = moveVec2.elem.getBoundingClientRect();
                moveVec2.x = e.clientX + rect.width * AttachManager.offsetX;
                moveVec2.y = e.clientY + rect.height * AttachManager.offsetY;
            }
        });
    }

    // ##################################################################### //
    // #endregion
    // ##################################################################### //
}
