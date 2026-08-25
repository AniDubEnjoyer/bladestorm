"use strict";
import { ComponentPropsWithRef } from "react";
import { HexGridCalc } from "./math-hex.ts";

type HexGridSpritesProps = ComponentPropsWithRef<"svg"> & {
    hexGridCalc: HexGridCalc;
    hexSprite: string;
};

/**
 * Constructs a grid of hexagons.
 * Renders a background sprite at every hex location.
 * Tracks a group of active <Hex> components that snap to grid locations.
 */
export default function HexGrid(props: HexGridSpritesProps) {
    const { ref, hexGridCalc, hexSprite } = props;

    return (
        <svg ref={ref} viewBox={hexGridCalc.viewBox} width={hexGridCalc.width} height={hexGridCalc.height}>
            {hexGridCalc.pxMap.map((hexPixel) => (
                <image
                    href={hexSprite}
                    x={hexPixel.x}
                    y={hexPixel.y}
                    width={hexGridCalc.hexSize.width}
                    height={hexGridCalc.hexSize.height}
                    key={`${hexPixel.x}_${hexPixel.y}`}
                ></image>
            ))}
        </svg>
    );
}
