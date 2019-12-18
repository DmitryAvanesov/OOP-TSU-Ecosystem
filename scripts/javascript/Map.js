"use strict";
var Map = /** @class */ (function () {
    function Map(width, height) {
        this.ui = new UI();
        this.cells = [];
        if (width === parseInt(width.toString()) && height === parseInt(height.toString()) &&
            width > 0 && height > 0) {
            for (var i = 0; i < height; i++) {
                this.cells.push([]);
                for (var j = 0; j < width; j++) {
                    this.cells[this.cells.length - 1].push(new Cell(i, j));
                }
            }
            this.ui.CreateMap(this.cells);
        }
    }
    return Map;
}());
