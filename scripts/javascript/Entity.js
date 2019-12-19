"use strict";
var Entity = /** @class */ (function () {
    function Entity(cells) {
        var randomIndex = Math.floor(Math.random() * cells.length);
        this.location = cells[randomIndex][randomIndex];
    }
    return Entity;
}());
