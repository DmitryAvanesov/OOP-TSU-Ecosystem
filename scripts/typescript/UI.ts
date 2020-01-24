class UI {
    private entitySize: number;
    private cellDesertColor: string;
    private cellLakeColor: string;
    private cellMeadowColor: string;
    private cellUndefinedColor: string;
    private genderMaleColor: string;
    private genderFemaleColor: string;
    private speciesIncreaseColor: string;
    private speciesDecreaseColor: string;

    constructor() {
        this.entitySize = 32;
        this.cellDesertColor = "#E3DD76";
        this.cellLakeColor = "#5175FF";
        this.cellMeadowColor = "#ADFCAE";
        this.cellUndefinedColor = "#FFFFFF";
        this.genderMaleColor = "#02A3FE";
        this.genderFemaleColor = "#EC49A6";
        this.speciesIncreaseColor = "#C8FFC8";
        this.speciesDecreaseColor = "#FFC8C8";
    }

    public GenerateField(cells: Array<Array<Cell>>): void {
        var fieldCanvas: HTMLCanvasElement = document.getElementById("fieldCanvas") as HTMLCanvasElement;
        var drawer: CanvasRenderingContext2D = fieldCanvas.getContext("2d") as CanvasRenderingContext2D;
        drawer.clearRect(0, 0, this.entitySize * cells.length, this.entitySize * cells[0].length);
        drawer.beginPath();

        cells.forEach((row: Array<Cell>) => {
            row.forEach((cell: Cell) => {
                if (cell instanceof CellDesert) {
                    drawer.fillStyle = this.cellDesertColor;
                }
                else if (cell instanceof CellLake) {
                    drawer.fillStyle = this.cellLakeColor;
                }
                else if (cell instanceof CellMeadow) {
                    drawer.fillStyle = this.cellMeadowColor;
                }
                else {
                    drawer.fillStyle = this.cellUndefinedColor;
                }

                drawer.fillRect(this.entitySize * cell.row, this.entitySize * cell.col, this.entitySize, this.entitySize);
                drawer.stroke();
            });
        });
    }

    public PlaceFieldObject(object: FieldObject): void {
        var currentMap: HTMLElement = document.querySelector("#field") as HTMLElement;
        var currentEntity: HTMLElement = document.createElement("div");

        currentEntity.classList.add(`${object.name}`);
        currentEntity.id = `${object.index}`;
        currentEntity.style.top = `${this.entitySize * object.location.row}px`;
        currentEntity.style.left = `${this.entitySize * object.location.col}px`;
        currentMap.appendChild(currentEntity);

        var currentEntityImage: HTMLElement = document.createElement("img");
        currentEntityImage.classList.add("image");
        
        if (object instanceof Human) {
            if (object.male) {
                currentEntityImage.setAttribute("src", `../media/man.png`);
            }
            else {
                currentEntityImage.setAttribute("src", `../media/woman.png`);
            }
        }
        else {
            currentEntityImage.setAttribute("src", `../media/${object.name}.png`);
        }

        currentEntity.appendChild(currentEntityImage);

        if (object instanceof Entity) {
            this.UpdateStats(object);

            if (object instanceof Animal) {
                this.AddEntityInfo(currentEntity, object);
            }
        }
        else if (object instanceof Warehouse) {
            this.AddWarehouseInfo(object);
        }
    }

    private AddWarehouseInfo(warehouse: Warehouse): void {
        var currentWarehouse: HTMLElement = document.querySelector(`[id="${warehouse.index}"]`) as HTMLElement;
        var newFoodValue: HTMLElement = document.createElement("div");

        newFoodValue.classList.add("food-value");
        newFoodValue.innerHTML = warehouse.foodValueAccumulating.toString();
        currentWarehouse.appendChild(newFoodValue);
    }

    public UpdateWarehouseInfo(warehouse: Warehouse): void {
        var currentWarehouseInfo: HTMLElement = document.querySelector(`[id="${warehouse.index}"] > .food-value`) as HTMLElement;
        currentWarehouseInfo.innerHTML = warehouse.foodValueAccumulating.toString();
    }

    private AddEntityInfo(currentAnimal: Element, animal: Animal): void {
        var healthbar: HTMLElement = document.createElement("div");
        var healthbarInner: HTMLElement = document.createElement("div");
        var info: HTMLElement = document.createElement("div");
        var status: HTMLElement = document.createElement("div");
        var age: HTMLElement = document.createElement("div");
        var gender: HTMLElement = document.createElement("div");

        healthbar.classList.add("healthbar");
        healthbarInner.classList.add("healthbar-inner");
        info.classList.add("info");

        status.classList.add("status");
        status.innerHTML = "Strolling";

        age.classList.add("age");
        age.innerHTML = `${animal.age}/${animal.maxAge} years`;

        gender.classList.add("gender");
        if (animal.male) {
            gender.style.backgroundColor = this.genderMaleColor; 
        }
        else {
            gender.style.backgroundColor = this.genderFemaleColor; 
        }

        currentAnimal.appendChild(healthbar);
        healthbar.appendChild(healthbarInner);
        info.appendChild(age);
        info.appendChild(gender);
        info.appendChild(status);
        currentAnimal.appendChild(info);
    }

    public UpdateHealthbar(animal: Animal): void {
        var currentHealthbar: HTMLElement = document.querySelector(`[id="${animal.index}"] > .healthbar > .healthbar-inner`) as HTMLElement;
         currentHealthbar.style.width = `${animal.health / animal.maxHealth * 100}%`;

        if (animal.health > animal.maxHealth / 2) {
            currentHealthbar.style.backgroundColor = "green";
        }
        else if (animal.health > animal.maxHealth / 4) {
            currentHealthbar.style.backgroundColor = "yellow";
        }
        else {
            currentHealthbar.style.backgroundColor = "red";
        }
    }

    public UpdateStatus(animal: Animal, newStatus: string): void {
        var currentStatus: HTMLElement = document.querySelector(`[id="${animal.index}"] > .info > .status`) as HTMLElement;
        currentStatus.innerHTML = newStatus;
    }

    public UpdateAge(animal: Animal): void {
        var currentAge: HTMLElement = document.querySelector(`[id="${animal.index}"] > .info > .age`) as HTMLElement;
        currentAge.innerHTML = `${animal.age}/${animal.maxAge} years`;
    }

    public UpdateStats(entity: Entity): void {
        var currentStat: HTMLElement = document.querySelector(`[id="${entity.name}"]`) as HTMLElement;
        var newCount: number = entity.field.stats.get(entity.name) as number;

        if (newCount > parseInt(currentStat.innerHTML)) {
            currentStat.style.backgroundColor = this.speciesIncreaseColor;
        }
        else if (newCount < parseInt(currentStat.innerHTML)) {
            currentStat.style.backgroundColor = this.speciesDecreaseColor;
        }

        currentStat.innerHTML = entity.field.stats.get(entity.name)?.toString() as string;
    }

    public Move(animal: Animal, newLocation: Cell): void {
        var currentAnimal: HTMLElement = document.querySelector(`[id="${animal.index}"]`) as HTMLElement;
        var currentAnimalImage: HTMLElement = document.querySelector(`[id="${animal.index}"] > .image`) as HTMLElement;

        currentAnimal.style.top = `${this.entitySize * newLocation.row}px`;
        currentAnimal.style.left = `${this.entitySize * newLocation.col}px`;

        if (newLocation.col < animal.location.col) {
            currentAnimalImage.classList.add("flipped");
        }
        else if (newLocation.col > animal.location.col) {
            currentAnimalImage.classList.remove("flipped");
        }

        animal.moving = false;
    }

    public TurnIntoFarmer(human: Human): void {
        var currentHumanImage: HTMLElement = document.querySelector(`[id="${human.index}"] > .image`) as HTMLElement;

        console.log("TURNED");

        if (human.male) {
            currentHumanImage.setAttribute("src", `../media/farmer.png`);
        }
        else {
            currentHumanImage.setAttribute("src", `../media/farmeress.png`);
        }
    }

    public RemoveEntity(entity: Entity): void {
        var currentEntity: HTMLElement = document.querySelector(`[id="${entity.index}"]`) || document.createElement("img");
        this.UpdateStats(entity);
        currentEntity.remove();
    }
}