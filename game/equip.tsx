"use strict";
import * as React from "react";
import { useCss } from "kremling";
import Attach from "../drag-tsx-2D/attach.tsx";

// ##################################################################### //
// #region Types
// ##################################################################### //

interface EquipProps {
    ref?: React.RefObject<HTMLDivElement>;
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
 * An item that attaches to the player (the pointer) on collision.
 */
export default function Equip(props: EquipProps) {
    const { ref } = props;
    const style = useCss(css);

    return (
        <Attach ref={ref}>
            <div className="equip-bg" {...style} />
        </Attach>
    );
}
