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
var Field = /** @class */ (function () {
    function Field(width, height) {
        this.currentIndex = 0;
        this.ui = new UI();
        this.cells = [];
        this.plants = [];
        this.animals = [];
        this.treeAmount = 10;
        this.grassAmount = 15;
        this.pigAmount = 5;
        this.treeGrowInterval = 20000;
        this.grassGrowInterval = 5000;
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
        this.CreateEntities();
        this.GrowTree();
        this.GrowGrass();
    }
    Field.prototype.CreateEntities = function () {
        var _this = this;
        for (var i = 0; i < this.treeAmount; i++) {
            this.plants.push(new Tree(this));
            this.currentIndex++;
        }
        for (var i = 0; i < this.grassAmount; i++) {
            this.plants.push(new Grass(this));
            this.currentIndex++;
        }
        this.plants.forEach(function (plantItem) { return _this.ui.PlaceEntity(plantItem); });
        for (var i = 0; i < this.pigAmount; i++) {
            this.animals.push(new Pig(this));
            this.currentIndex++;
        }
        this.animals.forEach(function (animalItem) { return _this.ui.PlaceEntity(animalItem); });
    };
    Field.prototype.GrowTree = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                setInterval(function () {
                    var newTree = new Tree(_this);
                    _this.plants.push(newTree);
                    _this.ui.PlaceEntity(newTree);
                }, this.treeGrowInterval);
                return [2 /*return*/];
            });
        });
    };
    Field.prototype.GrowGrass = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                setInterval(function () {
                    var newGrass = new Grass(_this);
                    _this.plants.push(newGrass);
                    _this.ui.PlaceEntity(newGrass);
                }, this.grassGrowInterval);
                return [2 /*return*/];
            });
        });
    };
    Field.prototype.RemovePlant = function (currentPlant) {
        this.plants.splice(this.plants.indexOf(currentPlant), 1);
    };
    Field.prototype.RemoveAnimal = function (currentAnimal) {
        this.animals.splice(this.animals.indexOf(currentAnimal), 1);
    };
    return Field;
}());
