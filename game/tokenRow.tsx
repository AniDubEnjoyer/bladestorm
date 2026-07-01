"use strict";
import * as React from "react";
import { useRef, useEffect } from "react";
import { useCss } from "kremling";
import { TokenStyle } from "./token.tsx";
import Token from "./token.tsx";

// ##################################################################### //
// #region Types
// ##################################################################### //

import type MoveVec2 from "../drag-tsx-2D/move-vec2.ts";
type ElemRef = React.RefObject<HTMLDivElement>;
type TokenElemRef = React.RefObject<typeof Token>;
type TokenMoveRef = React.RefObject<MoveVec2<HTMLDivElement>>;

interface Props {
    tokenCount: number;
}

// ##################################################################### //
// #endregion
// ##################################################################### //
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
 * A UI building block.
 */
export default function TokenRow(props: Props) {
    const l = props.tokenCount;
    const p = TokenBenchStyle.padding * 2;
    const g = TokenBenchStyle.gap * (l - 1);
    const w = l * TokenStyle.width;
    const css2 = `\n\n& .bench {
        width: ${p + g + w}px;
        grid-template: 1fr / repeat(${l}, 1fr);
    }
    `;

    const tokenElemRefs: Array<TokenElemRef> = Array.from({ length: l }, (_) => useRef(null));
    const tokenMoveRefs: Array<TokenMoveRef> = Array.from({ length: l }, (_) => useRef(null));
    const benchElemRef: ElemRef = useRef(null);
    const style = useCss(css + css2);

    useEffect(() => {
        const bench = benchElemRef.current;
        tokenMoveRefs.forEach((move) => move.current.moveToParent());
    }, []);

    return (
        <div className="bench" ref={benchElemRef} {...style}>
            {Array.from({ length: l }, (_, i) => (
                <div className="slot" key={i}>
                    <Token moveRef={tokenMoveRefs[i]} ref={tokenElemRefs[i]} />
                </div>
            ))}
        </div>
    );
}
