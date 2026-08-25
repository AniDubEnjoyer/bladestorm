# React Drag And Drop Library

React TSX function components.
Uses CSS absolute position to move nodes to pointer.

## Drag Component

An empty container node that can drag-and-drop.

### Implementation

- `pointerdown`: If pointer is hovering node:
    - Turn drag on
    - css position = absolute (does not reset)
- `pointermove`: If drag is on:
    - css left = pointer x
    - css top = pointer y
- `pointerup`:
    - Turn drag off

### Example

        import type { ComponentPropsWithoutRef } from "react";
        import Drag from "../tsx-drag-2D/drag.tsx";
        import MoveNode from "./move-node.ts";

        export default function DraggableItem(props: ComponentPropsWithoutRef<"div">) {
            function onDrag(moveNode: MoveNode<HTMLDivElement>) {
                console.log("Dragging started.");
            }

            function onDrop(moveNode: MoveNode<HTMLDivElement>) {
                console.log("Dragging stopped.");
            }

            return (
                <Drag dragEventFn={onDrag} dropEventFn={onDrop} {...props}>
                    <div style="width: 64px; height: 64px; background: blue" />
                </Drag>
            );
        }

## Attach Component

An empty container node that permanently follows the pointer.
Attaches on first `pointermove` after app loads.

### Implementation

- On node creation:
    - css position = absolute.
- `pointermove`:
    - css left = pointer x
    - css top = pointer y

### Example

        import type { ComponentPropsWithoutRef } from "react";
        import Attach from "../tsx-drag-2D/attach.tsx";

        export default function AttachedItem(props: ComponentPropsWithoutRef<"div">) {
            return (
                <Attach {...props}>
                    <div style="width: 64px; height: 64px; background: blue" />
                </Attach>
            );
        }
