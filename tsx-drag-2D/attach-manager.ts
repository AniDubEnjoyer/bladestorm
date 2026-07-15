"use strict";
import type MoveVec2 from "./move-vec2.ts";

/**
 * Global singleton to track all attached elements.
 * @summary All entities in current will move onMouseMove.
 */
class AttachManager {
    public current: MoveVec2[] = [];
    public offsetWidthPercent = -0.5;
    public offsetHeightPercent = -0.5;

    constructor() {
        addEventListener("pointermove", (e) => {
            console.log("pointermove");
            for (const moveVec2 of this.current) {
                const rect = moveVec2.elem.getBoundingClientRect();
                moveVec2.x = e.clientX + rect.width * this.offsetWidthPercent;
                moveVec2.y = e.clientY + rect.height * this.offsetHeightPercent;
            }
        });
    }

    splice(x: MoveVec2) {
        const i = attachManager.current.indexOf(x);
        if (i === -1) return;
        attachManager.current.splice(i, 1);
    }
}

/**
 * Global singleton to track all attached elements.
 * @summary All entities in current will move onMouseMove.
 */
export const attachManager = new AttachManager();
