"use strict";
var UI = /** @class */ (function () {
    function UI() {
    }
    UI.prototype.CreateMap = function (cells) {
        var _a;
        var currentMap = document.querySelector("#map") || document.createElement("div");
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
    UI.prototype.PlaceEntities = function (entities) {
        entities.forEach(function (entityItem) {
            var currentCell = document.querySelector("#map > tr:nth-child(" + entityItem.location.row + ") >\n                td:nth-child(" + entityItem.location.col + ")")
                || document.createElement("td");
            var currentEntity = document.createElement("img");
            currentEntity.setAttribute("src", "../media/" + entityItem.name + ".png");
            currentEntity.classList.add("" + entityItem.name);
            currentCell.appendChild(currentEntity);
        });
    };
    return UI;
}());
