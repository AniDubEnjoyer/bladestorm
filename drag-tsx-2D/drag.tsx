"use strict";
import * as React from "react";
import { useRef, useEffect } from "react";
import { useCss } from "kremling";
import { dragManager } from "./drag-manager.ts";
import MoveVec2 from "./move-vec2.ts";

// ##################################################################### //
// #region Types
// ##################################################################### //

type ElemRef = React.RefObject<HTMLDivElement>;
type MoveRef = React.RefObject<MoveVec2<HTMLDivElement>>;

interface DragProps {
    children?: React.ReactNode;
    className?: string;
    ref?: React.RefObject<typeof Drag>;
    moveRef?: MoveRef;
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
    const elemRef: ElemRef = useRef(null);
    const moveRef: MoveRef = props.moveRef || useRef(null);
    const style = useCss(css);

    // ~~~~~~~~~~~~ Event Handlers ~~~~~~~~~~~ //
    function down() {
        if (!elemRef.current.matches(":hover")) return;
        dragManager.current = moveRef.current;
    }

    function up() {
        if (dragManager.current != moveRef.current) return;
        dragManager.current = null;
    }

    // ~~~~~~~~~~~~~~~~~ Init ~~~~~~~~~~~~~~~~ //
    useEffect(() => {
        if (!moveRef.current) {
            moveRef.current = new MoveVec2(elemRef.current);
        }

        // ~~~~~~~~~~~~~~~ Cleanup ~~~~~~~~~~~~~~~ //
        return () => {
            if (dragManager.current != moveRef.current) return;
            dragManager.current = null;
        };
    }, []);

    // ====================================================== //
    // ======================== HTML ======================== //
    // ====================================================== //
    return (
        <div className={`drag ${props.className}`} ref={elemRef} onPointerDown={down} onPointerUp={up}>
            {props.children}
        </div>
    );
}
