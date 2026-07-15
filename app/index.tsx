"use strict";
import * as React from "react";
import { createRoot } from "react-dom/client";
import Village from "../tsx-game-2D/village.tsx";
import Tutorial from "../tsx-game-2D/tutorial.tsx";

const root = createRoot(document.getElementById("react-root"));
root.render(
    // <React.StrictMode>
    <>
        <Village />
        <Tutorial />
    </>,
    // </React.StrictMode>,
);
