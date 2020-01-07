class UI {
    private entitySize: number;

    constructor() {
        this.entitySize = 32;
    }

    public PlaceEntity(entity: Entity): void {
        var currentMap: HTMLElement = document.querySelector("#field") as HTMLElement;

        var currentEntity: HTMLElement = document.createElement("div");
        currentEntity.classList.add(`${entity.name}`);
        currentEntity.id = `${entity.index}`;
        currentEntity.style.top = `${this.entitySize * entity.location.row}px`;
        currentEntity.style.left = `${this.entitySize * entity.location.col}px`;
        currentMap.appendChild(currentEntity);

        var currentEntityImage: HTMLElement = document.createElement("img");
        currentEntityImage.classList.add("image");
        currentEntityImage.setAttribute("src", `../media/${entity.name}.png`);
        currentEntity.appendChild(currentEntityImage);

        if (entity instanceof Animal) {
            this.AddEntityInfo(currentEntity);
        }
    }

    private AddEntityInfo(currentAnimal: Element): void {
        var healthbar: HTMLElement = document.createElement("div");
        var healthbarInner: HTMLElement = document.createElement("div");

        healthbar.classList.add("healthbar");
        healthbarInner.classList.add("healthbar-inner");

        currentAnimal.appendChild(healthbar);
        healthbar.appendChild(healthbarInner);
    }

    public UpdateHealthbar(animal: Animal): void {
        var currentHealthbar: HTMLElement = document.querySelector(
            `[id="${animal.index}"] > .healthbar > .healthbar-inner`) as HTMLElement;

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

    public Move(animal: Animal, newLocation: Cell): void {
        var currentAnimal: HTMLElement = document.querySelector(
            `[id="${animal.index}"]`) as HTMLElement;
        var currentAnimalImage: HTMLElement = document.querySelector(
            `[id="${animal.index}"] > .image`) as HTMLElement;

        currentAnimal.style.top = `${this.entitySize * newLocation.row}px`;
        currentAnimal.style.left = `${this.entitySize * newLocation.col}px`;

        if (newLocation.col < animal.location.col) {
            currentAnimalImage.classList.add("flipped");
        }
        else if (newLocation.col > animal.location.col) {
            currentAnimalImage.classList.remove("flipped");
        }

        setTimeout(() => {
            animal.moving = false;
        }, animal.pace);
    }

    public removeEntity(entity: Entity): void {
        var currentEntity: HTMLElement = document.querySelector(
            `[id="${entity.index}"]`) || document.createElement("img");
        currentEntity.remove();
    }
}