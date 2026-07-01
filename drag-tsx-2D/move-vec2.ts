"use strict";

/**
 * A 2D element positioned using CSS absolute position.
 */
export default class MoveVec2<ElemType extends HTMLElement = HTMLElement> {
    constructor(
        private _elem?: ElemType,
        private _on = true,
        private _x?: number,
        private _y?: number,
    ) {
        if (!_on) return;
        this.start();
    }

    // ##################################################################### //
    // #region Public API
    // ##################################################################### //

    enable() {
        if (this._on) return;
        this._on = true;
        this.start();
    }

    moveToParent() {
        if (!this._elem) return;
        if (!this._elem.parentElement) return;
        const rect = this._elem.parentElement.getBoundingClientRect();
        this._elem.style.left = `${rect.x}px`;
        this._elem.style.top = `${rect.y}px`;
    }

    // ##################################################################### //
    // #endregion
    // ##################################################################### //
    // ##################################################################### //
    // #region Private API
    // ##################################################################### //

    private start() {
        if (!this._elem) return;
        const rect = this._elem.getBoundingClientRect();
        const x = this._x || rect.x;
        const y = this._y || rect.y;
        this._elem.style.left = `${x}px`;
        this._elem.style.top = `${y}px`;
        this._elem.style.position = "absolute";
        this._elem.style.zIndex = "999";
    }

    // ##################################################################### //
    // #endregion
    // ##################################################################### //
    // ##################################################################### //
    // #region Properties
    // ##################################################################### //

    get on() {
        return this._on;
    }

    get x() {
        return this._x;
    }
    set x(val) {
        this._x = val;
        if (!this._on) return;
        if (!this._elem) return;
        this._elem.style.left = `${val}px`;
    }

    get y() {
        return this._y;
    }
    set y(val) {
        this._y = val;
        if (!this._on) return;
        if (!this._elem) return;
        this._elem.style.top = `${val}px`;
    }

    get elem() {
        return this._elem;
    }
    set elem(val) {
        this._elem = val;
        if (!this._on) return;
        this.start();
    }

    // ##################################################################### //
    // #endregion
    // ##################################################################### //
}
