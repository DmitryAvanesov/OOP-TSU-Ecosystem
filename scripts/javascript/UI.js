"use strict";
var UI = /** @class */ (function () {
    function UI() {
    }
    UI.prototype.CreateMap = function (cells) {
        var _a;
        var currentMap = document.querySelector("#map");
        for (var i = 0; i < cells.length; i++) {
            var currentRow = document.createElement("tr");
            for (var j = 0; j < cells[i].length; j++) {
                var currentCell = document.createElement("td");
                currentCell.classList.add("cell");
                currentRow.appendChild(currentCell);
            }
            (_a = currentMap) === null || _a === void 0 ? void 0 : _a.appendChild(currentRow);
        }
    };
    return UI;
}());
