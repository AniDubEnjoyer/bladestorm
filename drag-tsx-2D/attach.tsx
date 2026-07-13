"use strict";
import * as React from "react";
import { useRef, useEffect } from "react";
import { useCss } from "kremling";
import { attachManager } from "./attach-manager.ts";
import MoveVec2 from "./move-vec2.ts";

// ##################################################################### //
// #region Types
// ##################################################################### //

type ElemRef = React.RefObject<HTMLDivElement>;
type MoveRef = React.RefObject<MoveVec2<HTMLDivElement>>;

interface AttachProps {
    children?: React.ReactNode;
    className?: string;
    ref?: React.RefObject<typeof Attach>;
    moveRef?: MoveRef;
}

// ##################################################################### //
// #endregion
// ##################################################################### //
// ##################################################################### //
// #region Config
// ##################################################################### //

const css = `
& .attach {
    width: max-content;
    height: max-content;
}
`;

// ##################################################################### //
// #endregion
// ##################################################################### //

/**
 * A 2D sprite that attaches to the pointer onMouseEnter.
 */
export default function Attach(props: AttachProps) {
    const elemRef: ElemRef = useRef(null);
    const moveRef: MoveRef = useRef(null);
    const style = useCss(css);

    function enter() {
        elemRef.current.style.pointerEvents = "none";
        moveRef.current.enable();
        attachManager.current.push(moveRef.current);
    }

    useEffect(() => {
        moveRef.current = new MoveVec2(elemRef.current, false);
        return () => attachManager.splice(moveRef.current);
    }, []);

    // ====================================================== //
    // ======================== HTML ======================== //
    // ====================================================== //
    return (
        <div className={`attach ${props.className}`} ref={elemRef} onPointerEnter={enter} {...style}>
            {props.children}
        </div>
    );
}
