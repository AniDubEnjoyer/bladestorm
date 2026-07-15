"use strict";
import * as React from "react";
import { useRef, useEffect } from "react";
import { useCss } from "kremling";
import { dragManager } from "./drag-manager.ts";
import MoveVec2 from "./move-vec2.ts";

// ##################################################################### //
// #region Types
// ##################################################################### //

type MoveRef = React.RefObject<MoveVec2<HTMLDivElement>>;

interface DragProps {
    children?: React.ReactNode;
    className?: string;
    ref?: React.RefObject<HTMLDivElement>;
}

// ##################################################################### //
// #endregion
// ##################################################################### //
// ##################################################################### //
// #region Config
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

/**
 * A drag-and-drop 2D sprite.
 */
export default function Drag(props: DragProps) {
    const { children, className, ref } = props;
    const moveRef: MoveRef = useRef(null);
    const style = useCss(css);

    function down() {
        if (!ref.current.matches(":hover")) return;
        dragManager.current = moveRef.current;
    }

    function up() {
        if (dragManager.current != moveRef.current) return;
        dragManager.current = null;
    }

    useEffect(() => {
        moveRef.current = new MoveVec2(ref.current);
        return () => dragManager.remove(moveRef.current);
    }, [ref, moveRef]);

    // ====================================================== //
    // ======================== HTML ======================== //
    // ====================================================== //
    return (
        <div className={`drag ${className}`} ref={ref} onPointerDown={down} onPointerUp={up} {...style}>
            {children}
        </div>
    );
}
