class Human extends Omnivore {
    public partner: Human | undefined;
    private house: House | undefined;
    private nearestHouse: House | undefined;
    public ageOfConsent: number;
    public goingToBuild: boolean;
    private statusGoingToBuild: string;
    public isFarmer: boolean;

    constructor(currentField: Field) {
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
        this.isFarmer = false;

        this.CheckEating();
    }

    public FindPartner() {
        if (this.partner === undefined) {
            var contenders: Array<Omnivore> = Object.assign([], this.field.omnivoreAnimals);
            var currentContender: number = 0;

            while (currentContender < contenders.length) {
                if (!(contenders[currentContender] instanceof Human) || (this.male && contenders[currentContender].male) || (!this.male && !contenders[currentContender].male) || contenders[currentContender].age < this.ageOfConsent || (contenders[currentContender] as Human).partner !== undefined) {
                    contenders.splice(currentContender, 1);
                }
                else {
                    currentContender++;
                }
            }

            if (contenders.length > 0) {
                this.partner = contenders[Math.floor(Math.random() * contenders.length)] as Human;
                this.partner.partner = this;
                this.FindPlaceForBuildingHouse();
            }
        }
    }

    private FindPlaceForBuildingHouse() {
        var minAcceptableDistance: number = 250;
        var minDistance: number = 1000;

        this.field.houses.forEach((house: House) => {
            var curDistance: number = Math.abs(house.location.row - this.location.row) + Math.abs(house.location.col - this.location.col);

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

    private BuildHouse() {
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

    public BuildFarm(): void {
        var newFarm: Farm;

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

        this.isFarmer = true;
    } 

    protected Stroll() {
        var maxDistanceToHouse: number = 10;

        if (this.house !== undefined) {
            var distanceToHouse: number = Math.abs(this.house.location.row - this.location.row) + Math.abs(this.house.location.col - this.location.col);

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
                var distanceToNearestHouse: number = Math.abs(this.nearestHouse.location.row - this.location.row) + Math.abs(this.nearestHouse.location.col - this.location.col);

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