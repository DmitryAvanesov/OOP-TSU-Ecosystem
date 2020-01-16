"use strict";
class UI {
    constructor() {
        this.entitySize = 32;
    }
    PlaceFieldObject(object) {
        var currentMap = document.querySelector("#field");
        var currentEntity = document.createElement("div");
        currentEntity.classList.add(`${object.name}`);
        currentEntity.id = `${object.index}`;
        currentEntity.style.top = `${this.entitySize * object.location.row}px`;
        currentEntity.style.left = `${this.entitySize * object.location.col}px`;
        currentMap.appendChild(currentEntity);
        var currentEntityImage = document.createElement("img");
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
        if (object instanceof Animal) {
            this.AddEntityInfo(currentEntity, object.male);
        }
    }
    AddEntityInfo(currentAnimal, male) {
        var healthbar = document.createElement("div");
        var healthbarInner = document.createElement("div");
        var info = document.createElement("div");
        var status = document.createElement("div");
        var age = document.createElement("div");
        var gender = document.createElement("div");
        healthbar.classList.add("healthbar");
        healthbarInner.classList.add("healthbar-inner");
        info.classList.add("info");
        status.classList.add("status");
        status.innerHTML = "Strolling";
        age.classList.add("age");
        age.innerHTML = "0";
        gender.classList.add("gender");
        if (male) {
            gender.innerHTML = "M";
        }
        else {
            gender.innerHTML = "F";
        }
        currentAnimal.appendChild(healthbar);
        healthbar.appendChild(healthbarInner);
        info.appendChild(age);
        info.appendChild(gender);
        info.appendChild(status);
        currentAnimal.appendChild(info);
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
    UpdateStatus(animal, newStatus) {
        var currentStatus = document.querySelector(`[id="${animal.index}"] > .info > .status`);
        currentStatus.innerHTML = newStatus;
    }
    UpdateAge(animal) {
        var currentAge = document.querySelector(`[id="${animal.index}"] > .info > .age`);
        currentAge.innerHTML = animal.age.toString();
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
    RemoveEntity(entity) {
        var currentEntity = document.querySelector(`[id="${entity.index}"]`) || document.createElement("img");
        currentEntity.remove();
    }
}
