"use strict";
import * as React from "react";
import { useRef, useEffect } from "react";
import { useCss } from "kremling";
import { attachManager } from "./attach-manager.ts";
import MoveVec2 from "./move-vec2.ts";

// ##################################################################### //
// #region Types
// ##################################################################### //

type MoveRef = React.RefObject<MoveVec2<HTMLDivElement>>;

interface AttachProps {
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
& .attach {
    width: max-content;
    height: max-content;
}
`;

// ##################################################################### //
// #endregion
// ##################################################################### //

/**
 * A 2D sprite that attaches onPointerEnter.
 */
export default function Attach(props: AttachProps) {
    const { children, className, ref } = props;
    const moveRef: MoveRef = useRef(null);
    const style = useCss(css);

    function enter() {
        ref.current.style.pointerEvents = "none";
        moveRef.current.enable();
        attachManager.current.push(moveRef.current);
    }

    useEffect(() => {
        moveRef.current = new MoveVec2(ref.current, false);
        return () => attachManager.splice(moveRef.current);
    }, [ref, moveRef]);

    // ====================================================== //
    // ======================== HTML ======================== //
    // ====================================================== //
    return (
        <div className={`attach ${className}`} ref={ref} onPointerEnter={enter} {...style}>
            {children}
        </div>
    );
}
