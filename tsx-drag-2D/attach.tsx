"use strict";
import * as React from "react";
import { useRef, ComponentPropsWithRef, RefObject } from "react";
import { useCss } from "kremling";
import AttachManager from "./attach-manager.ts";
import MoveNode from "./move-node.ts";

// ##################################################################### //
// #region Immutable Config
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
// ##################################################################### //
// #region React Component
// ##################################################################### //

/**
 * A 2D sprite that permanently follows the pointer.
 */
export default function Attach(props: ComponentPropsWithRef<"div">) {
    const { children, className } = props;
    const moveRef: RefObject<MoveNode<HTMLDivElement>> = useRef(null);
    const style = useCss(css);

    function addToManager(node: HTMLDivElement) {
        moveRef.current = new MoveNode(node);
        AttachManager.add(moveRef.current);
        return () => AttachManager.splice(moveRef.current);
    }

    return (
        <div className={`attach ${className}`} ref={addToManager} {...style}>
            {children}
        </div>
    );
}

// ##################################################################### //
// #endregion
// ##################################################################### //
