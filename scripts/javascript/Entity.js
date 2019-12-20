"use strict";
var Entity = /** @class */ (function () {
    function Entity(cells) {
        this.name = "";
        do {
            this.location =
                cells[Math.floor(Math.random() * cells.length)][Math.floor(Math.random() * cells[0].length)];
        } while (this.location.occupied);
        this.location.occupied = true;
    }
    return Entity;
}());
