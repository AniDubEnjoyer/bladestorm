"use strict";
import { ComponentPropsWithRef } from "react";
import { HexPattern } from "./math-hex.ts";

export type HexGridProps = ComponentPropsWithRef<"svg"> & {
    hexPattern: HexPattern;
    hexSprite: string;
};

/**
 * A radial grid of hexagon svg sprites.
 */
export default function HexGrid(props: HexGridProps) {
    const { ref, hexPattern, hexSprite } = props;

    return (
        <svg ref={ref} viewBox={hexPattern.svgViewBox} width={hexPattern.svgWidth} height={hexPattern.svgHeight}>
            {hexPattern.svgMap.map((hexSvgPos) => (
                <image
                    href={hexSprite}
                    x={hexSvgPos.x}
                    y={hexSvgPos.y}
                    width={hexPattern.hexSize.width}
                    height={hexPattern.hexSize.height}
                    key={`${hexSvgPos.x}_${hexSvgPos.y}`}
                ></image>
            ))}
        </svg>
    );
}
