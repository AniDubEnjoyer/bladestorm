"use strict";
import * as React from "react";
import { useRef } from "react";
import { useCss } from "kremling";
import Equip from "./equip.tsx";
type ElemRef = React.RefObject<HTMLDivElement>;

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
    const equipElemRef: ElemRef = useRef(null);
    const style = useCss(css);

    return (
        <div className="tutorial" {...style}>
            <Equip ref={equipElemRef} />
        </div>
    );
}
