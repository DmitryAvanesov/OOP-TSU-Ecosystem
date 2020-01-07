"use strict";
class UI {
    constructor() {
        this.entitySize = 32;
    }
    PlaceEntity(entity) {
        var currentMap = document.querySelector("#field");
        var currentEntity = document.createElement("div");
        currentEntity.classList.add(`${entity.name}`);
        currentEntity.id = `${entity.index}`;
        currentEntity.style.top = `${this.entitySize * entity.location.row}px`;
        currentEntity.style.left = `${this.entitySize * entity.location.col}px`;
        currentMap.appendChild(currentEntity);
        var currentEntityImage = document.createElement("img");
        currentEntityImage.classList.add("image");
        currentEntityImage.setAttribute("src", `../media/${entity.name}.png`);
        currentEntity.appendChild(currentEntityImage);
        if (entity instanceof Animal) {
            this.AddEntityInfo(currentEntity);
        }
    }
    AddEntityInfo(currentAnimal) {
        var healthbar = document.createElement("div");
        var healthbarInner = document.createElement("div");
        healthbar.classList.add("healthbar");
        healthbarInner.classList.add("healthbar-inner");
        currentAnimal.appendChild(healthbar);
        healthbar.appendChild(healthbarInner);
    }
    UpdateHealthbar(animal) {
        var currentHealthbar = document.querySelector(`[id="${animal.index}"] > .healthbar > .healthbar-inner`);
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
    Move(animal, newLocation) {
        var currentAnimal = document.querySelector(`[id="${animal.index}"]`);
        var currentAnimalImage = document.querySelector(`[id="${animal.index}"] > .image`);
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
    removeEntity(entity) {
        var currentEntity = document.querySelector(`[id="${entity.index}"]`) || document.createElement("img");
        currentEntity.remove();
    }
}
