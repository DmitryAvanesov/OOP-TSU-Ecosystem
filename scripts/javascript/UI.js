"use strict";
class UI {
    CreateMap(cells) {
        var _a;
        var currentMap = document.querySelector("#field") || document.createElement("div");
        for (var i = 0; i < cells.length; i++) {
            var currentRow = document.createElement("tr");
            for (var j = 0; j < cells[i].length; j++) {
                var currentCell = document.createElement("td");
                currentCell.classList.add("cell");
                currentCell.id = `${i}:${j}`;
                currentRow.appendChild(currentCell);
            }
            (_a = currentMap) === null || _a === void 0 ? void 0 : _a.appendChild(currentRow);
        }
    }
    PlaceEntity(entity) {
        var currentCell = document.querySelector(`[id="${entity.location.row}:${entity.location.col}"]`)
            || document.createElement("td");
        var currentEntity = document.createElement("div");
        currentEntity.classList.add(`${entity.name}`);
        currentEntity.id = `${entity.index}`;
        currentCell.appendChild(currentEntity);
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
        var currentHealthbar = document.querySelector(`[id="${animal.index}"] > .healthbar > .healthbar-inner`)
            || document.createElement("div");
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
        var currentAnimal = document.querySelector(`[id="${animal.index}"]`) || document.createElement("div");
        var currentAnimalImage = document.querySelector(`[id="${animal.index}"] > .image`) || document.createElement("img");
        if (newLocation.row < animal.location.row) {
            currentAnimal.classList.add("moveTop");
        }
        else if (newLocation.row > animal.location.row) {
            currentAnimal.classList.add("moveBottom");
        }
        if (newLocation.col < animal.location.col) {
            currentAnimal.classList.add("moveLeft");
            currentAnimalImage.classList.add("flipped");
        }
        else if (newLocation.col > animal.location.col) {
            currentAnimal.classList.add("moveRight");
            currentAnimalImage.classList.remove("flipped");
        }
        var newLocationCell = document.querySelector(`[id="${newLocation.row}:${newLocation.col}"]`) || document.createElement("td");
        setTimeout(() => {
            currentAnimal.classList.remove("moveTop", "moveRight", "moveBottom", "moveLeft");
            newLocationCell.appendChild(currentAnimal);
            animal.moving = false;
        }, animal.pace);
    }
    removeEntity(entity) {
        var currentEntity = document.querySelector(`[id="${entity.index}"]`) || document.createElement("img");
        currentEntity.remove();
    }
}
