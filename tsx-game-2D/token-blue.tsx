"use strict";
import { useCss } from "kremling";
import Drag from "../tsx-drag-2D/drag.tsx";
import type { CustomComponentPropsWithRef } from "react";

// ##################################################################### //
// #region Immutable Config
// ##################################################################### //

export const TokenStyle = {
    width: 60,
    height: 60,
};

const bgCss = `
& .token-bg {
    width: ${TokenStyle.width}px;
    height: ${TokenStyle.height}px;
    background-color: blue;
}
`;

// ##################################################################### //
// #endregion
// ##################################################################### //
// ##################################################################### //
// #region React Component
// ##################################################################### //

/**
 * A draggable blue square.
 */
export default function Token(props: CustomComponentPropsWithRef<typeof Drag>) {
    const bgStyle = useCss(bgCss);

    return (
        <Drag {...props}>
            <div className="token-bg" {...bgStyle} />
        </Drag>
    );
}

// ##################################################################### //
// #endregion
// ##################################################################### //
