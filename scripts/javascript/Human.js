"use strict";
class Human extends Omnivore {
    constructor(currentField) {
        super(currentField);
        this.name = "human";
        this.maxHealth = 15;
        this.health = this.maxHealth;
        this.maxAge = 30;
        this.pace = 300;
        this.reproductionProbability = 0;
        this.ageOfConsent = 3;
        this.buildingHouse = false;
        this.harvesting = false;
        this.statusBuildingHouse = "Building a house";
        this.statusHarvesting = "Harvesting";
        this.isFarmer = false;
        this.foodValueCarrying = 0;
        this.CheckEating();
    }
    FindPartner() {
        if (this.partner === undefined) {
            var contenders = Object.assign([], this.field.omnivoreAnimals);
            var currentContender = 0;
            while (currentContender < contenders.length) {
                if (!(contenders[currentContender] instanceof Human) || (this.male && contenders[currentContender].male) || (!this.male && !contenders[currentContender].male) || contenders[currentContender].age < this.ageOfConsent || contenders[currentContender].partner !== undefined) {
                    contenders.splice(currentContender, 1);
                }
                else {
                    currentContender++;
                }
            }
            if (contenders.length > 0) {
                this.partner = contenders[Math.floor(Math.random() * contenders.length)];
                this.partner.partner = this;
                this.FindPlaceForBuildingHouse();
            }
        }
    }
    BuildNear(object) {
        object.location.occupied = false;
        do {
            object.location = this.field.cells[this.location.row + Math.floor(Math.random() * 3) - 1][this.location.col + Math.floor(Math.random() * 3) - 1];
        } while (object.location.occupied);
        object.location.occupied = true;
        this.field.ui.PlaceFieldObject(object);
    }
    FindPlaceForBuildingHouse() {
        var minAcceptableDistance = 250;
        var minDistance = 1000;
        this.field.houses.forEach((house) => {
            var curDistance = Math.abs(house.location.row - this.location.row) + Math.abs(house.location.col - this.location.col);
            if (curDistance < minDistance) {
                minDistance = curDistance;
                this.nearestHouse = house;
            }
        });
        if (minDistance <= minAcceptableDistance) {
            this.buildingHouse = true;
            this.field.ui.UpdateStatus(this, this.statusBuildingHouse);
        }
        else {
            this.BuildHouse();
        }
    }
    BuildHouse() {
        this.house = new House(this.field);
        if (this.partner !== undefined) {
            this.partner.house = this.house;
        }
        this.BuildNear(this.house);
        this.strolling = true;
        this.field.ui.UpdateStatus(this, this.statusStrolling);
    }
    BuildFarm() {
        if (Math.random() > 0.5) {
            this.farm = new PlantFarm(this.field, this);
        }
        else {
            this.farm = new AnimalFarm(this.field, this);
        }
        this.BuildNear(this.farm);
        this.isFarmer = true;
        this.field.ui.TurnIntoFarmer(this);
    }
    FindWarehouse() {
        var nearestWarehouse;
        var minDistance = 1000;
        var minAcceptableDistance = 20;
        var curDistance;
        if (this.field.warehouses.length > 0) {
            this.field.warehouses.forEach((warehouse) => {
                curDistance = Math.abs(warehouse.location.row - this.location.row) + Math.abs(warehouse.location.col - this.location.col);
                if (curDistance < minDistance && curDistance < minAcceptableDistance) {
                    nearestWarehouse = warehouse;
                    minDistance = curDistance;
                }
            });
        }
        return nearestWarehouse;
    }
    Stroll() {
        var _a, _b, _c, _d;
        var maxDistanceToHouse = 10;
        if (this.harvesting) {
            this.field.ui.UpdateStatus(this, this.statusHarvesting);
            if (this.foodValueCarrying == 0) {
                this.MoveToGoal(this.farm);
                if (this.location == ((_a = this.farm) === null || _a === void 0 ? void 0 : _a.location)) {
                    this.foodValueCarrying = (_b = this.farm.food) === null || _b === void 0 ? void 0 : _b.foodValue;
                    (_c = this.farm.food) === null || _c === void 0 ? void 0 : _c.Die();
                    this.farm.food = undefined;
                }
            }
            else {
                this.nearestWarehouse = this.FindWarehouse();
                if (this.nearestWarehouse === undefined) {
                    var newWarehouse = new Warehouse(this.field);
                    this.BuildNear(newWarehouse);
                    this.nearestWarehouse = this.FindWarehouse();
                }
                else {
                    this.MoveToGoal(this.nearestWarehouse);
                }
                if (this.location == ((_d = this.nearestWarehouse) === null || _d === void 0 ? void 0 : _d.location)) {
                    this.nearestWarehouse.foodValueAccumulating += this.foodValueCarrying;
                    this.foodValueCarrying = 0;
                    this.field.ui.UpdateWarehouseInfo(this.nearestWarehouse);
                    this.harvesting = false;
                    this.eating = true;
                    this.field.ui.UpdateStatus(this, this.statusEating);
                }
            }
            setTimeout(() => {
                this.Stroll();
            }, this.pace * 2);
        }
        else {
            if (this.house !== undefined) {
                var distanceToHouse = Math.abs(this.house.location.row - this.location.row) + Math.abs(this.house.location.col - this.location.col);
                if (distanceToHouse > maxDistanceToHouse * maxDistanceToHouse) {
                    this.location.occupied = false;
                    this.location = this.house.location;
                    this.location.occupied = true;
                }
                else if (distanceToHouse > maxDistanceToHouse) {
                    this.MoveToGoal(this.house);
                }
                else {
                    super.Stroll();
                }
            }
            else {
                if (this.buildingHouse && this.nearestHouse !== undefined) {
                    var distanceToNearestHouse = Math.abs(this.nearestHouse.location.row - this.location.row) + Math.abs(this.nearestHouse.location.col - this.location.col);
                    if (distanceToNearestHouse > maxDistanceToHouse) {
                        this.MoveToGoal(this.nearestHouse);
                        setTimeout(() => this.Stroll(), this.pace);
                    }
                    else {
                        this.BuildHouse();
                        this.buildingHouse = false;
                    }
                }
                else {
                    super.Stroll();
                }
            }
        }
    }
    Die() {
        var _a;
        (_a = this.farm) === null || _a === void 0 ? void 0 : _a.ChooseNewFarmer();
        super.Die();
    }
}
