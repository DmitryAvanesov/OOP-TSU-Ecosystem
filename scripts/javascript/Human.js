"use strict";
class Human extends Omnivore {
    constructor(currentField) {
        super(currentField);
        this.name = "human";
        this.maxHealth = 15;
        this.health = this.maxHealth;
        this.maxAge = 30;
        this.age = Math.floor(Math.random() * this.maxAge);
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
                this.FindPlaceForBuilding();
            }
        }
    }
    FindPlaceForBuilding() {
        var minAcceptableDistance = 200;
        var nearestHouse;
        var minDistance = 1000;
        this.field.houses.forEach((house) => {
            var curDistance = Math.abs(house.location.row - this.location.row) + Math.abs(house.location.col - this.location.col);
            if (curDistance < minDistance) {
                minDistance = curDistance;
                nearestHouse = house;
            }
        });
        if (minDistance <= minAcceptableDistance) {
            this.goingToBuild = true;
            this.field.ui.UpdateStatus(this, this.statusGoingToBuild);
        }
        else {
            this.Build();
        }
    }
    Build() {
        this.house = new House(this.field);
        console.log("BUILT");
        if (this.partner !== undefined) {
            this.partner.house = this.house;
        }
        this.house.location.occupied = false;
        this.house.location = this.location;
        this.house.location.occupied = true;
        this.field.ui.PlaceFieldObject(this.house);
    }
    Stroll() {
        var maxDistanceToHouse = 4;
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
                }
                else {
                    this.Build();
                    this.goingToBuild = false;
                }
            }
            else {
                super.Stroll();
            }
        }
    }
}
