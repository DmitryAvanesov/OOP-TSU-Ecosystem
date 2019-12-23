class UI {
    public CreateMap (cells : Array<Array<Cell>>) : void {
        var currentMap : Element = document.querySelector("#field") || document.createElement("div");

        for (var i : number = 0; i < cells.length; i++) {
            var currentRow : Element = document.createElement("tr");

            for (var j : number = 0; j < cells[i].length; j++) {
                var currentCell : Element = document.createElement("td");
                currentCell.classList.add("cell");
                currentCell.id = `${i}:${j}`;
                currentRow.appendChild(currentCell);
            }

            currentMap?.appendChild(currentRow);
        }
    }

    public PlaceEntity (entity : Entity) : void {
        var currentCell : Element = document.querySelector(
            `[id="${entity.location.row}:${entity.location.col}"]`)
            || document.createElement("td");

        var currentEntity : Element = document.createElement("div");    
        currentEntity.classList.add(`${entity.name}`);
        currentEntity.id = `${entity.index}`;
        currentCell.appendChild(currentEntity);

        var currentEntityImage : Element = document.createElement("img");
        currentEntityImage.classList.add("image");
        currentEntityImage.setAttribute("src", `../media/${entity.name}.png`);
        currentEntity.appendChild(currentEntityImage);

        if (entity instanceof Animal) {
            this.AddEntityInfo(currentEntity);
        }
    }

    private AddEntityInfo (currentEntity : Element) : void {
        var healthbar : Element = document.createElement("div");
        var healthbarInner : Element = document.createElement("div");

        healthbar.classList.add("healthbar");
        healthbarInner.classList.add("healthbar-inner");

        currentEntity.appendChild(healthbar);
        healthbar.appendChild(healthbarInner);
    }

    public async Move (animal : Animal, newLocation : Cell) : Promise<void> {
        var currentAnimal : Element = document.querySelector(
            `[id="${animal.index}"]`) || document.createElement("img");

        if (newLocation.row < animal.location.row) {
            currentAnimal.classList.add("moveTop");
        }
        else if (newLocation.row > animal.location.row) {
            currentAnimal.classList.add("moveBottom");
        }

        if (newLocation.col < animal.location.col) {
            currentAnimal.classList.add("moveLeft");
            currentAnimal.classList.add("flipped");
        }
        else if (newLocation.col > animal.location.col) {
            currentAnimal.classList.add("moveRight");
            currentAnimal.classList.remove("flipped");
        }

        var newLocationCell : Element = document.querySelector(
            `[id="${newLocation.row}:${newLocation.col}"]`) || document.createElement("td");

        setTimeout(() => {
            currentAnimal.classList.remove("moveTop", "moveRight", "moveBottom", "moveLeft");
            newLocationCell.appendChild(currentAnimal);
        }, animal.pace);
    }

    public removeEntity (entity : Entity) : void {
        var currentAnimal : Element = document.querySelector(
            `[id="${entity.index}"]`) || document.createElement("img");     
        currentAnimal.remove();
    }
}