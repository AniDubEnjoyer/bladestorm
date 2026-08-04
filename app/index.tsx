"use strict";
import * as React from "react";
import { createRoot } from "react-dom/client";
import Token from "../tsx-game-2D/token-blue.tsx";
import HexSpriteGrid from "../tsx-hex-2D/hex-sprite-grid.tsx";
import { HexSize, HexVec3, HexGrid } from "../tsx-hex-2D/hex-math.ts";

const hexSize = new HexSize(36);
const hexGrid = new HexGrid(2, hexSize);
const hexPixel = HexVec3.DIRECTIONS[0].toPx(hexSize);
const root = createRoot(document.getElementById("react-root"));

root.render(
    // <React.StrictMode>
    <>
        {/* Testing GridHexBg */}
        <HexSpriteGrid hexGrid={hexGrid} hexSprite="sprites/hex-dirt.svg" />

        {/* Testing Hex Mask */}
        {/* <svg width="100" height="100">
            <mask id="hex-mask">
                <image href="sprites/hex-mask.svg" width="100" height="100" />
            </mask>
            <rect width="100" height="100" fill="purple" mask="url(#hex-mask)" />
        </svg> */}

        {/* Testing Drag */}
        <Token snapX={hexPixel.x} snapY={hexPixel.y} />
    </>,
    // </React.StrictMode>,
);
