"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var Animal = /** @class */ (function (_super) {
    __extends(Animal, _super);
    function Animal(currentField) {
        var _this = _super.call(this, currentField) || this;
        _this.field = currentField;
        _this.health = 1;
        _this.maxHealth = 1;
        _this.pace = 0;
        _this.starveInterval = 5000;
        _this.strollInterval = 8000;
        _this.strolling = true;
        _this.strollFunction = 0;
        _this.starveFunction = 0;
        _this.Stroll();
        _this.Starve();
        return _this;
    }
    Animal.prototype.Stroll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.strollFunction = setTimeout(function () {
                    if (_this.strolling) {
                        _this.Move();
                    }
                    _this.Stroll();
                }, this.strollInterval * (Math.random() / 5 + 0.9));
                return [2 /*return*/];
            });
        });
    };
    Animal.prototype.Move = function () {
        return __awaiter(this, void 0, void 0, function () {
            var freeCells, i, j, newRow, newCol, currentCell, newLocation;
            return __generator(this, function (_a) {
                freeCells = [];
                for (i = -1; i <= 1; i++) {
                    for (j = -1; j <= 1; j++) {
                        newRow = this.location.row + i;
                        newCol = this.location.col + j;
                        if (newRow < this.field.cells.length && newRow >= 0 &&
                            newCol < this.field.cells[0].length && newCol >= 0) {
                            currentCell = this.field.cells[newRow][newCol];
                            if (!currentCell.occupied) {
                                freeCells.push(currentCell);
                            }
                        }
                    }
                }
                newLocation = freeCells[Math.floor(Math.random() * freeCells.length)];
                this.location.occupied = false;
                newLocation.occupied = true;
                this.field.ui.Move(this, newLocation);
                this.location = newLocation;
                return [2 /*return*/];
            });
        });
    };
    Animal.prototype.Starve = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.starveFunction = setInterval(function () {
                    _this.health--;
                    _this.field.ui.UpdateHealthbar(_this);
                    if (_this.health < _this.maxHealth / 2) {
                        _this.strolling = false;
                        _this.Eat();
                    }
                    if (_this.health == 0) {
                        _this.field.RemoveAnimal(_this);
                        _this.die();
                    }
                }, this.starveInterval);
                return [2 /*return*/];
            });
        });
    };
    Animal.prototype.die = function () {
        clearTimeout(this.strollFunction);
        clearInterval(this.starveFunction);
    };
    return Animal;
}(Entity));
