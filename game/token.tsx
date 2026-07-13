"use strict";
import * as React from "react";
import { useCss } from "kremling";
import Drag from "../drag-tsx-2D/drag.tsx";

// ##################################################################### //
// #region Types
// ##################################################################### //

interface TokenProps {
    ref?: React.RefObject<HTMLDivElement>;
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
 * A draggable UI element.
 */
export default function Token(props: TokenProps) {
    const { ref } = props;
    const style = useCss(css);

    return (
        <Drag ref={ref}>
            <div className="token-bg" {...style} />
        </Drag>
    );
}
