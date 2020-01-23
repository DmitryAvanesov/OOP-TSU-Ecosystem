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
        this.goingToBuild = false;
        this.statusGoingToBuild = "Going to build";
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
            this.goingToBuild = true;
            this.field.ui.UpdateStatus(this, this.statusGoingToBuild);
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
        this.house.location.occupied = false;
        this.house.location = this.location;
        this.house.location.occupied = true;
        this.field.ui.PlaceFieldObject(this.house);
        this.strolling = true;
        this.field.ui.UpdateStatus(this, this.statusStrolling);
    }
    BuildFarm() {
        var newFarm;
        if (Math.random() > 0.5) {
            newFarm = new PlantFarm(this.field, this);
        }
        else {
            newFarm = new AnimalFarm(this.field, this);
        }
        newFarm.location.occupied = false;
        newFarm.location = this.location;
        newFarm.location.occupied = true;
        this.field.ui.PlaceFieldObject(newFarm);
    }
    Stroll() {
        var maxDistanceToHouse = 10;
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
            if (this.goingToBuild && this.nearestHouse !== undefined) {
                var distanceToNearestHouse = Math.abs(this.nearestHouse.location.row - this.location.row) + Math.abs(this.nearestHouse.location.col - this.location.col);
                if (distanceToNearestHouse > maxDistanceToHouse) {
                    this.MoveToGoal(this.nearestHouse);
                    setTimeout(() => this.Stroll(), this.pace);
                }
                else {
                    this.BuildHouse();
                    this.goingToBuild = false;
                }
            }
            else {
                super.Stroll();
            }
        }
    }
}
