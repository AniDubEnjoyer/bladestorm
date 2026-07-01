"use strict";
import type MoveVec2 from "./move-vec2.ts";

/**
 * Global singleton to track current element being dragged.
 * @summary Set current and it will move onMouseMove.
 */
class DragManager {
    public current: MoveVec2;
    public offsetWidthPercent = -0.5;
    public offsetHeightPercent = -0.5;

    constructor() {
        addEventListener("mousemove", (e) => {
            if (!this.current) return;
            const rect = this.current.elem.getBoundingClientRect();
            this.current.x = e.clientX + rect.width * this.offsetWidthPercent;
            this.current.y = e.clientY + rect.height * this.offsetHeightPercent;
        });
    }
}

/**
 * Global singleton to track current element being dragged.
 * @summary Set current and it will move onMouseMove.
 */
export const dragManager = new DragManager();
