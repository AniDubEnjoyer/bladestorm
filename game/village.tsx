"use strict";
import * as React from "react";
import { useCss } from "kremling";
import TokenRow from "./tokenRow.tsx";

// ##################################################################### //
// #region Config
// ##################################################################### //

const css = `
& .village {
    
}
`;

// ##################################################################### //
// #endregion
// ##################################################################### //

/**
 * UI for village level.
 */
export default function Village() {
    const style = useCss(css);

    return (
        <div className="village" {...style}>
            <TokenRow />
        </div>
    );
}
