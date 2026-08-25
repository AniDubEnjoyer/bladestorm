"use strict";
import { ComponentRef, RefObject, useRef } from "react";
import Drag from "../tsx-drag-2D/drag.tsx";
import HexGrid from "./hex-grid.tsx";
import { HexGridCalc } from "./math-hex.ts";
import type MoveNode from "../tsx-drag-2D/move-node.ts";

interface HexProps {
    hexSprite: string;
    hexGridCalc: HexGridCalc;
    hexGridElem: ComponentRef<typeof HexGrid>;
}

export default function Hex(props: HexProps) {
    const { hexSprite, hexGridCalc, hexGridElem } = props;
    const size = hexGridCalc.hexSize;

    const snap = (moveNode: MoveNode<HTMLDivElement>) => {
        // const originalPos = new HexVec2(moveNode.x, moveNode.y);
        // const snappedPos = originalPos.toHex(size).rounded().toPx(size);
        // moveNode.move(snappedPos.x, snappedPos.y);
    };

    return (
        <Drag dropEvtFns={[snap]}>
            <svg width={size.width} height={size.height}>
                <image href={hexSprite} width={size.width} height={size.height} />
            </svg>
        </Drag>
    );
}
