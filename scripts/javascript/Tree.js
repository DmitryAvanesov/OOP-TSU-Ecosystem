"use strict";
class Tree extends Plant {
    constructor(currentField, isFarmers = false) {
        super(currentField, isFarmers);
        this.name = "tree";
    }
}
