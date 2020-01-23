class Human extends Omnivore {
    public partner: Human | undefined;
    private house: House | undefined;
    private nearestHouse: House | undefined;
    private nearestWarehouse: Warehouse | undefined;
    public ageOfConsent: number;
    public buildingHouse: boolean;
    public harvesting: boolean;
    private statusBuildingHouse: string;
    private statusHarvesting: string;
    public isFarmer: boolean;
    private farm: Farm | undefined;
    private foodValueCarrying: number;

    constructor(currentField: Field) {
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
            this.buildingHouse = true;
            this.field.ui.UpdateStatus(this, this.statusBuildingHouse);
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
        if (Math.random() > 0.5) {
            this.farm = new PlantFarm(this.field, this);
        }
        else {
            this.farm = new AnimalFarm(this.field, this);
        }

        this.farm.location.occupied = false;
        this.farm.location = this.location;
        this.farm.location.occupied = true;
        this.field.ui.PlaceFieldObject(this.farm);

        this.isFarmer = true;
        this.field.ui.TurnIntoFarmer(this);
    }

    private FindWarehouse(): Warehouse | undefined {
        var nearestWarehouse: Warehouse | undefined;
        var minDistance: number = 1000;
        var minAcceptableDistance: number = 30;
        var curDistance: number;

        if (this.field.warehouses.length > 0) {
            this.field.warehouses.forEach((warehouse: Warehouse) => {
                curDistance = Math.abs(warehouse.location.row - this.location.row) + Math.abs(warehouse.location.col - this.location.col);

                if (curDistance < minDistance && curDistance < minAcceptableDistance) {
                    nearestWarehouse = warehouse;
                    minDistance = curDistance;
                }
            });
        }

        return nearestWarehouse;
    }

    private BuildWarehouse(): void {
        var newWarehouse: Warehouse = new Warehouse(this.field);

        newWarehouse.location.occupied = false;
        newWarehouse.location = this.location;
        newWarehouse.location.occupied = true;
        this.field.ui.PlaceFieldObject(newWarehouse);
    }

    protected Stroll() {
        var maxDistanceToHouse: number = 10;

        if (this.harvesting) {
            if (this.foodValueCarrying == 0) {
                this.MoveToGoal(this.farm as FieldObject);

                if (this.location == this.farm?.location) {
                    this.foodValueCarrying = this.farm.food?.foodValue as number;
                    this.farm.food?.Die();
                    this.farm.food = undefined;
                }
            }
            else {
                this.nearestWarehouse = this.FindWarehouse();
    
                if (this.nearestWarehouse === undefined) {
                    this.BuildWarehouse();
                    this.nearestWarehouse = this.FindWarehouse();
                }
                else {
                    this.MoveToGoal(this.nearestWarehouse);
                }

                if (this.location == this.nearestWarehouse?.location) {
                    this.nearestWarehouse.foodValueAccumulating += this.foodValueCarrying;
                    this.foodValueCarrying = 0;
                    this.field.ui.UpdateWarehouseInfo(this.nearestWarehouse);
                    this.harvesting = false;
                }
            }
        }
        else {
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
                if (this.buildingHouse && this.nearestHouse !== undefined) {
                    var distanceToNearestHouse: number = Math.abs(this.nearestHouse.location.row - this.location.row) + Math.abs(this.nearestHouse.location.col - this.location.col);
    
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
}