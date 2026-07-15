"use strict";
import * as React from "react";
// import { useCss } from "kremling";
// import Spritesheet from "react-responsive-spritesheet";

// ##################################################################### //
// #region Types
// ##################################################################### //

interface SpriteGridHexProps {
    cols: number;
    rows: number;
    r_hex: number;
}

// ##################################################################### //
// #endregion
// ##################################################################### //
// ##################################################################### //
// #region Config
// ##################################################################### //

// const css = `
// & .sprite-grid-hex {
//     color: red;
// }
// `;

// ##################################################################### //
// #endregion
// ##################################################################### //

export default function SpriteGridHex(props: SpriteGridHexProps) {
    const { cols, rows, r_hex } = props;
    const w_hex = Math.round(Math.sqrt(3) * r_hex);
    const h_hex = Math.round(2 * r_hex);
    const odd = (n: number) => n % 2 !== 0;

    return (
        <div>
            <svg width={(cols + 0.5) * w_hex} height={(0.75 * rows + 0.25) * h_hex}>
                {Array.from({ length: rows }, (_, row) =>
                    Array.from({ length: cols }, (_, col) => (
                        <image
                            href="svg-game-2D/hex-empty.svg"
                            x={odd(row) ? w_hex * (col + 0.5) : w_hex * col}
                            y={h_hex * row * 0.75}
                            width={w_hex}
                            height={h_hex}
                            key={`${col}_${row}`}
                        ></image>
                    )),
                )}
            </svg>
        </div>
    );
}
