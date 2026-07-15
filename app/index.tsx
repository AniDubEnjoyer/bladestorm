"use strict";
import * as React from "react";
import { createRoot } from "react-dom/client";
import SpriteGridHex from "../tsx-hex-2D/grid.tsx";

const root = createRoot(document.getElementById("react-root"));
root.render(
    // <React.StrictMode>
    <>
        <SpriteGridHex cols={2} rows={2} r_hex={32} />
    </>,
    // </React.StrictMode>,
);
