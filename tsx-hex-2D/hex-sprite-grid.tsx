"use strict";
import * as React from "react";
import { HexGrid } from "./hex-math.ts";

interface HexSpriteGridProps {
    hexGrid: HexGrid;
    hexSprite: string;
}

export default function HexSpriteGrid(props: HexSpriteGridProps) {
    const { hexGrid, hexSprite } = props;

    return (
        <div>
            <svg viewBox={hexGrid.viewBox} width={hexGrid.width} height={hexGrid.height}>
                {hexGrid.pixelMap.map((hexPixel) => (
                    <image
                        href={hexSprite}
                        x={hexPixel.x}
                        y={hexPixel.y}
                        width={hexGrid.hexSize.width}
                        height={hexGrid.hexSize.height}
                        key={`${hexPixel.x}_${hexPixel.y}`}
                    ></image>
                ))}
            </svg>
        </div>
    );
}
