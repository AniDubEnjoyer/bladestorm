"use strict";
import { createRoot } from "react-dom/client";
import { HexGridCalc, HexSize } from "../tsx-hex-2D/math-hex.ts";
import HexGrid from "../tsx-hex-2D/hex-grid.tsx";

const hexGridCalc = new HexGridCalc({ radius: 4, hexSize: new HexSize(36) });
const root = createRoot(document.getElementById("react-root") as HTMLElement);

root.render(
    // <React.StrictMode>
    <>
        {/* Testing HexGrid */}
        <HexGrid hexGridCalc={hexGridCalc} hexSprite="sprites/hex-dirt.svg" />

        {/* Testing Hex Mask */}
        {/* <svg width="100" height="100">
            <mask id="hex-mask">
                <image href="sprites/hex-mask.svg" width="100" height="100" />
            </mask>
            <rect width="100" height="100" fill="purple" mask="url(#hex-mask)" />
        </svg> */}
    </>,
    // </React.StrictMode>,
);
