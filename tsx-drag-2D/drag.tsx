"use strict";
import { useRef, ComponentPropsWithoutRef } from "react";
import { useCss } from "kremling";
import DRAG_MANAGER from "./drag-manager.ts";
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

type DragProps = ComponentPropsWithoutRef<"div"> & {
    /** Do stuff when it starts dragging. */
    dragEvtFns?: ((moveNode: MoveNode<HTMLDivElement>) => void)[];
    /** Do stuff when it stops dragging. */
    dropEvtFns?: ((moveNode: MoveNode<HTMLDivElement>) => void)[];
};

/**
 * An empty container node that can drag-and-drop.
 */
export default function Drag(props: DragProps) {
    const { children, className, dragEvtFns, dropEvtFns } = props;
    const ref = useRef<HTMLDivElement>(null);
    const moveRef = useRef<MoveNode<HTMLDivElement>>(null);
    const style = useCss(css);

    function init(node: HTMLDivElement) {
        const moveNode = new MoveNode(node);
        ref.current = node;
        moveRef.current = moveNode;
        return () => DRAG_MANAGER.remove(moveNode);
    }

    function onPointerDown() {
        if (!ref.current?.matches(":hover")) return;
        DRAG_MANAGER.add(moveRef.current!);
        dragEvtFns?.forEach((fn) => fn(moveRef.current!));
    }

    function onPointerUp() {
        if (DRAG_MANAGER.dragged != moveRef.current) return;
        dropEvtFns?.forEach((fn) => fn(moveRef.current!));
        DRAG_MANAGER.clear();
    }

    return (
        <div className={`drag ${className}`} ref={init} onPointerDown={onPointerDown} onPointerUp={onPointerUp} {...style}>
            {children}
        </div>
    );
}

// ##################################################################### //
// #endregion
// ##################################################################### //
