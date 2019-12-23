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
var Pig = /** @class */ (function (_super) {
    __extends(Pig, _super);
    function Pig(currentField) {
        var _this = _super.call(this, currentField) || this;
        _this.name = "pig";
        _this.health = 10;
        _this.maxHealth = 10;
        _this.pace = 3000;
        return _this;
    }
    return Pig;
}(Herbivore));
