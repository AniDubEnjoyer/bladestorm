"use strict";
import * as React from "react";
import { createRoot } from "react-dom/client";
import Village from "../game/village.tsx";
import Tutorial from "../game/tutorial.tsx";

const root = createRoot(document.getElementById("react-root"));
root.render(
    // <React.StrictMode>
    <>
        <Village />
        <Tutorial />
    </>,
    // </React.StrictMode>,
);
