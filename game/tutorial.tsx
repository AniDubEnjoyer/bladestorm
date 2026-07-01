"use strict";
import * as React from "react";
import { useRef } from "react";
import { useCss } from "kremling";
import TokenRow from "./tokenRow.tsx";
import Equip from "./equip.tsx";

// ##################################################################### //
// #region Types
// ##################################################################### //

import type MoveVec2 from "../drag-tsx-2D/move-vec2.ts";

type ElemRef = React.RefObject<HTMLDivElement>;
type EquipElemRef = React.RefObject<typeof Equip>;
type EquipMoveRef = React.RefObject<MoveVec2<HTMLDivElement>>;

// ##################################################################### //
// #endregion
// ##################################################################### //
// ##################################################################### //
// #region Config
// ##################################################################### //

const css = `
& .tutorial {
    
}
`;

// ##################################################################### //
// #endregion
// ##################################################################### //

/**
 * UI for tutorial level.
 */
export default function Tutorial() {
    const equipElemRef: EquipElemRef = useRef(null);
    const equipMoveRef: EquipMoveRef = useRef(null);
    const style = useCss(css);

    return (
        <div className="tutorial" {...style}>
            <Equip moveRef={equipMoveRef} ref={equipElemRef} />
        </div>
    );
}
