"use strict";
import type MoveNode from "./move-node.ts";

/**
 * Global singleton to track all global active <Attach> elements.
 */
class AttachManager {
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

    #attached: MoveNode[] = [];
    get attached() {
        return this.#attached;
    }

    add(x: MoveNode) {
        this.#attached.push(x);
    }

    splice(x: MoveNode) {
        const indexInArray = this.#attached.indexOf(x);
        const notInArray = indexInArray === -1;
        if (notInArray) return;
        this.#attached.splice(indexInArray, 1);
    }

    // ##################################################################### //
    // #endregion
    // ##################################################################### //
    // ##################################################################### //
    // #region Internal Init
    // ##################################################################### //

    constructor() {
        addEventListener("pointermove", (e) => {
            for (const moveVec2 of this.#attached) {
                if (!moveVec2.elem) return;
                const rect = moveVec2.elem.getBoundingClientRect();
                moveVec2.x = e.clientX + rect.width * this.offsetX;
                moveVec2.y = e.clientY + rect.height * this.offsetY;
            }
        });
    }

    // ##################################################################### //
    // #endregion
    // ##################################################################### //
}

/**
 * Global singleton to track all global active <Attach> elements.
 */
const ATTACH_MANAGER = new AttachManager();
export default ATTACH_MANAGER;
