# React Hexagonal Grid Library

React TSX function components.
Drag-and-drop nodes onto hexagonal grids.

## Hex Grid Component

A radial grid of hexagon svg sprites.

### Implementation

"Cube" coordinate system:

- Three axes: q, r, s
- q + r + s must equal 0
- To move to neighbor hex:
    - Move +1 in an axis
    - Move -1 in another axis

Flat top orientation:

- +q axis: 0 deg
- +r axis: 240 deg
- +s axis: 120 deg
- hex width: 2 * circumradius
- hex height: sqrt(3) * circumradius
- q basis vector: {3/2, sqrt(3)/2}
- r basis vector: {0, sqrt(3)}

Pointy top orientation:

- +q axis: 30 deg
- +r axis: 270 deg
- +s axis: 150 deg
- hex width: sqrt(3) * circumradius
- hex height: 2 * circumradius
- q basis vector: {sqrt(3), 0}
- r basis vector: {sqrt(3)/2, 3/2}

## Hex Component

A drag-and-drop svg sprite.
Snaps to designated HexGrids.

### Implementation

Using `tsx-drag-2D`, on drop, for each designated HexGrid:

1. Get hex DOM position
2. Convert to HexGrid basis:
    - Subtract center of HexGrid DOM position
3. Convert to cube coordinates:
    - Multiply by basis vector matrix
    - Scale by circumradius
4. If not within grid: continue (stop checking this HexGrid)
5. Round cube coordinates to nearest integers
6. Convert back to pixels in HexGrid basis:
    - Descale by circumradius
    - Multiply by inverse of basis vector matrix
7. Convert back to DOM basis:
    - Add center of HexGrid DOM position
8. return (dont check any other HexGrids)

# Example

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
