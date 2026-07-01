"use strict";
import * as React from "react";
import { useCss } from "kremling";
import Attach from "../drag-tsx-2D/attach.tsx";

// ##################################################################### //
// #region Types
// ##################################################################### //

import type MoveVec2 from "../drag-tsx-2D/move-vec2.ts";

interface Props {
    moveRef: React.RefObject<MoveVec2<HTMLDivElement>>;
    ref?: React.RefObject<typeof Equip>;
}

// ##################################################################### //
// #endregion
// ##################################################################### //
// ##################################################################### //
// #region Config
// ##################################################################### //

export const EquipStyle = {
    width: 60,
    height: 60,
};

const css = `
& .equip-bg {
    width: ${EquipStyle.width}px;
    height: ${EquipStyle.height}px;
    background-color: blue;
}
`;

// ##################################################################### //
// #endregion
// ##################################################################### //

/**
 * A 2D sprite that attaches onPointerEnter.
 */
export default function Equip(props: Props) {
    const style = useCss(css);

    return (
        <Attach moveRef={props.moveRef} ref={props.ref}>
            <div className="equip-bg" {...style} />
        </Attach>
    );
}
