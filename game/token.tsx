"use strict";
import * as React from "react";
import { useCss } from "kremling";
import Drag from "../drag-tsx-2D/drag.tsx";

// ##################################################################### //
// #region Types
// ##################################################################### //

import type MoveVec2 from "../drag-tsx-2D/move-vec2.ts";

interface Props {
    moveRef: React.RefObject<MoveVec2<HTMLDivElement>>;
    ref?: React.RefObject<typeof Token>;
}

// ##################################################################### //
// #endregion
// ##################################################################### //
// ##################################################################### //
// #region Config
// ##################################################################### //

export const TokenStyle = {
    width: 60,
    height: 60,
};

const css = `
& .token-bg {
    width: ${TokenStyle.width}px;
    height: ${TokenStyle.height}px;
    background-color: blue;
}
`;

// ##################################################################### //
// #endregion
// ##################################################################### //

/**
 * A draggable 2D sprite.
 */
export default function Token(props: Props) {
    const style = useCss(css);

    return (
        <Drag moveRef={props.moveRef} ref={props.ref}>
            <div className="token-bg" {...style} />
        </Drag>
    );
}
