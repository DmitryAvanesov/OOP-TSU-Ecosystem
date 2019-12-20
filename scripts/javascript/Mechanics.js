"use strict";
var Mechanics = /** @class */ (function () {
    function Mechanics() {
        this.mapWidth = 100;
        this.mapHeight = 100;
        this.map = new Field(this.mapWidth, this.mapHeight);
    }
    return Mechanics;
}());
var mechanics = new Mechanics();
