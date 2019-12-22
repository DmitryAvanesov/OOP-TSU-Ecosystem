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

        var currentEntity : Element = document.createElement("img");
        currentEntity.setAttribute("src", `../media/${entity.name}.png`);
        currentEntity.classList.add(`${entity.name}`);
        currentEntity.id = `${entity.index}`;

        currentCell.appendChild(currentEntity);
    }

    public async Move (animal : Animal, newLocation : Cell) : Promise<void> {
        var currentAnimal : Element = document.querySelector(
            `[id="${animal.index}"]`) || document.createElement("img");

        console.log(animal.location.row, animal.location.col, newLocation.row, newLocation.col);

        if (newLocation.row < animal.location.row) {
            currentAnimal.classList.add("moveTop");
        }
        else if (newLocation.row > animal.location.row) {
            currentAnimal.classList.add("moveBottom");
        }

        if (newLocation.col < animal.location.col) {
            currentAnimal.classList.add("moveLeft");
        }
        else if (newLocation.col > animal.location.col) {
            currentAnimal.classList.add("moveRight");
        }

        var newLocationCell : Element = document.querySelector(
            `[id="${newLocation.row}:${newLocation.col}"]`) || document.createElement("td");

        setTimeout(() => {
            console.log("reeeeee");
            currentAnimal.classList.remove("moveTop", "moveRight", "moveBottom", "moveLeft");
            newLocationCell.appendChild(currentAnimal);
        }, animal.pace);
    }
}