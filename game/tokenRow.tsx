"use strict";
import * as React from "react";
import { useRef } from "react";
import { useCss } from "kremling";
import { TokenStyle } from "./token.tsx";
import Token from "./token.tsx";

// ##################################################################### //
// #region Config
// ##################################################################### //

export const TokenBenchStyle = {
    padding: 20,
    gap: 20,
};

const css = `
& .bench {
    box-sizing: border-box;
    height: ${TokenStyle.height + TokenBenchStyle.padding * 2}px;
    padding: ${TokenBenchStyle.padding}px;
    gap: ${TokenBenchStyle.gap}px;
    display: grid;
    background-color: black;
}

& .slot {
    width: 60px;
    height: 60px;
    background-color: yellow;
}
`;

// ##################################################################### //
// #endregion
// ##################################################################### //

/**
 * A UI box with 4 Tokens.
 */
export default function TokenRow() {
    const tokenElemRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
    const l = 4;
    const p = TokenBenchStyle.padding * 2;
    const g = TokenBenchStyle.gap * (l - 1);
    const w = l * TokenStyle.width;
    const style = useCss(
        css +
            `\n\n& .bench {
        width: ${p + g + w}px;
        grid-template: 1fr / repeat(${l}, 1fr);
    }
    `,
    );

    return (
        <div className="bench" {...style}>
            {Array.from({ length: l }, (_, i) => (
                <div className="slot" key={i}>
                    <Token ref={tokenElemRefs[i]} />
                </div>
            ))}
        </div>
    );
}
