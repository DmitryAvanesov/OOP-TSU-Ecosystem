"use strict";
var UI = /** @class */ (function () {
    function UI() {
    }
    UI.prototype.CreateMap = function (cells) {
        var _a;
        var currentMap = document.querySelector("#field") || document.createElement("div");
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
    UI.prototype.PlacePlant = function (plant) {
        var currentCell = document.querySelector("#field > tr:nth-child(" + plant.location.row + ") >\n            td:nth-child(" + plant.location.col + ")")
            || document.createElement("td");
        var currentEntity = document.createElement("img");
        currentEntity.setAttribute("src", "../media/" + plant.name + ".png");
        currentEntity.classList.add("" + plant.name);
        currentCell.appendChild(currentEntity);
    };
    return UI;
}());
