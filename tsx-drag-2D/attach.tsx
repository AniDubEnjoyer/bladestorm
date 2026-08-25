"use strict";
import { useRef, ComponentPropsWithoutRef } from "react";
import { useCss } from "kremling";
import ATTACH_MANAGER from "./attach-manager.ts";
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
 * An empty container node that permanently follows the pointer.
 */
export default function Attach(props: ComponentPropsWithoutRef<"div">) {
    const { children, className } = props;
    const moveRef = useRef<MoveNode<HTMLDivElement>>(null);
    const style = useCss(css);

    function addToManager(node: HTMLDivElement) {
        const moveNode = new MoveNode(node);
        moveRef.current = moveNode;
        ATTACH_MANAGER.add(moveNode);
        return () => ATTACH_MANAGER.splice(moveNode);
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
