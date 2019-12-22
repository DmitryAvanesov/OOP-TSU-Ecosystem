"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
                currentCell.id = i + ":" + j;
                currentRow.appendChild(currentCell);
            }
            (_a = currentMap) === null || _a === void 0 ? void 0 : _a.appendChild(currentRow);
        }
    };
    UI.prototype.PlaceEntity = function (entity) {
        var currentCell = document.querySelector("[id=\"" + entity.location.row + ":" + entity.location.col + "\"]")
            || document.createElement("td");
        var currentEntity = document.createElement("img");
        currentEntity.setAttribute("src", "../media/" + entity.name + ".png");
        currentEntity.classList.add("" + entity.name);
        currentEntity.id = "" + entity.index;
        currentCell.appendChild(currentEntity);
    };
    UI.prototype.Move = function (animal, newLocation) {
        return __awaiter(this, void 0, void 0, function () {
            var currentAnimal, newLocationCell;
            return __generator(this, function (_a) {
                currentAnimal = document.querySelector("[id=\"" + animal.index + "\"]") || document.createElement("img");
                console.log(animal.location.row, animal.location.col, newLocation.row, newLocation.col);
                if (newLocation.row < animal.location.row) {
                    currentAnimal.classList.add("moveTop");
                }
                else if (newLocation.row > animal.location.row) {
                    currentAnimal.classList.add("moveBottom");
                }
                if (newLocation.col < animal.location.col) {
                    currentAnimal.classList.add("moveLeft");
                }
                else if (newLocation.col > animal.location.col) {
                    currentAnimal.classList.add("moveRight");
                }
                newLocationCell = document.querySelector("[id=\"" + newLocation.row + ":" + newLocation.col + "\"]") || document.createElement("td");
                setTimeout(function () {
                    console.log("reeeeee");
                    currentAnimal.classList.remove("moveTop", "moveRight", "moveBottom", "moveLeft");
                    newLocationCell.appendChild(currentAnimal);
                }, animal.pace);
                return [2 /*return*/];
            });
        });
    };
    return UI;
}());
