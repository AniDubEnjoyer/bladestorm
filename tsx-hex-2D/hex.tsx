"use strict";
import { ComponentRef, RefObject } from "react";
import { HexPattern, HexPxPos } from "./math-hex.ts";
import HexGrid from "./hex-grid.tsx";
import Drag from "../tsx-drag-2D/drag.tsx";
import type MoveNode from "../tsx-drag-2D/move-node.ts";

export interface HexProps {
    hexGridRefs: RefObject<ComponentRef<typeof HexGrid> | null>[];
    hexPattern: HexPattern;
    hexSprite: string;
}

/**
 * A drag-and-drop svg sprite.
 * Snaps to designated HexGrids.
 */
export default function Hex(props: HexProps) {
    const { hexGridRefs, hexPattern, hexSprite } = props;
    const size = hexPattern.hexSize;

    const snap = (moveNode: MoveNode<HTMLDivElement>) => {
        for (const hexGridRef of hexGridRefs) {
            const gridDomRect = hexGridRef.current!.getBoundingClientRect();
            const gridDomCenterX = gridDomRect.left + gridDomRect.width / 2;
            const gridDomCenterY = gridDomRect.top + gridDomRect.height / 2;
            const gridDomCenterPos = new HexPxPos(gridDomCenterX, gridDomCenterY);

            const hexDomPos = new HexPxPos(moveNode.x!, moveNode.y!);
            const hexSvgPos = hexDomPos.minus(gridDomCenterPos);
            const hexCubePos = hexSvgPos.toCube(size);
            if (!hexPattern.hitTest(hexCubePos)) continue;

            const newHexSvgPos = hexCubePos.rounded().toPx(size);
            const newHexDomPos = newHexSvgPos.plus(gridDomCenterPos);
            moveNode.move(newHexDomPos.x, newHexDomPos.y);
            return;
        }
    };

    return (
        <Drag dropEvtFn={snap}>
            <svg width={size.width} height={size.height}>
                <image href={hexSprite} width={size.width} height={size.height} />
            </svg>
        </Drag>
    );
}
