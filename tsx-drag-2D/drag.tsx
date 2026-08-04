"use strict";
import * as React from "react";
import { useRef, ComponentPropsWithRef, RefObject } from "react";
import { useCss } from "kremling";
import { mRound } from "../ts-utils/math.ts";
import DragManager from "./drag-manager.ts";
import MoveNode from "./move-node.ts";

// ##################################################################### //
// #region Immutable Config
// ##################################################################### //

const css = `
& .drag {
    width: max-content;
    height: max-content;
}
`;

// ##################################################################### //
// #endregion
// ##################################################################### //
// ##################################################################### //
// #region React Component
// ##################################################################### //

type DragProps = ComponentPropsWithRef<"div"> & {
    /** When dropped, will snap to multiples of this. */ snapX?: number;
    /** When dropped, will snap to multiples of this. */ snapY?: number;
};

/**
 * A drag-and-drop 2D sprite.
 */
export default function Drag(props: DragProps) {
    const { children, className, snapX, snapY } = props;
    const ref: RefObject<HTMLDivElement> = useRef(null);
    const moveRef: RefObject<MoveNode<HTMLDivElement>> = useRef(null);
    const style = useCss(css);

    function addToManager(node: HTMLDivElement) {
        ref.current = node;
        moveRef.current = new MoveNode(node);
        return () => DragManager.remove(moveRef.current);
    }

    function onPointerDown() {
        if (!ref.current.matches(":hover")) return;
        DragManager.add(moveRef.current);
    }

    function onPointerUp() {
        if (DragManager.dragged != moveRef.current) return;
        if (snapX) moveRef.current.x = mRound(moveRef.current.x, snapX);
        if (snapY) moveRef.current.y = mRound(moveRef.current.y, snapY);
        DragManager.clear();
    }

    return (
        <div className={`drag ${className}`} ref={addToManager} onPointerDown={onPointerDown} onPointerUp={onPointerUp} {...style}>
            {children}
        </div>
    );
}

// ##################################################################### //
// #endregion
// ##################################################################### //
