"use strict";
import { createRoot } from "react-dom/client";
import TestHexGrid from "../tsx-game-2D/test-hex.tsx";

const root = createRoot(document.getElementById("react-root") as HTMLElement);

root.render(
    // <React.StrictMode>
    <>
        {/* Testing HexGrid */}
        <TestHexGrid hexGridSprite="sprites/hex-dirt.svg" hexTokenSprite="sprites/hex-grass.svg" />

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
