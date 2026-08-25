import { ComponentPropsWithRef, ComponentRef, useRef } from "react";
import HexGrid from "../tsx-hex-2D/hex-grid";
import Hex from "../tsx-hex-2D/hex";
import { HexSpiral, HexSize } from "../tsx-hex-2D/math-hex";

export type TestHexGridProps = ComponentPropsWithRef<"div"> & {
    hexGridSprite: string;
    hexTokenSprite: string;
};

/**
 * A test hex grid and some test hexes.
 */
export default function TestHexGrid(props: TestHexGridProps) {
    const { hexGridSprite, hexTokenSprite } = props;
    const hexPattern = new HexSpiral({ radiusHexes: 4, hexSize: new HexSize(36) });
    const hexGridRef = useRef<ComponentRef<typeof HexGrid>>(null);

    return (
        <div>
            <HexGrid ref={hexGridRef} hexPattern={hexPattern} hexSprite={hexGridSprite} />
            <Hex hexGridRefs={[hexGridRef]} hexPattern={hexPattern} hexSprite={hexTokenSprite} />
            <Hex hexGridRefs={[hexGridRef]} hexPattern={hexPattern} hexSprite={hexTokenSprite} />
            <Hex hexGridRefs={[hexGridRef]} hexPattern={hexPattern} hexSprite={hexTokenSprite} />
        </div>
    );
}
