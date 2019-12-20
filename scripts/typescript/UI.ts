class UI {
    public CreateMap (cells : Array<Array<Cell>>) {
        var currentMap : Element = document.querySelector("#field") || document.createElement("div");

        for (var i : number = 0; i < cells.length; i++) {
            var currentRow : Element = document.createElement("tr");

            for (var j : number = 0; j < cells[i].length; j++) {
                var currentCell : Element = document.createElement("td");
                currentCell.classList.add("cell");
                currentRow.appendChild(currentCell);
            }

            currentMap?.appendChild(currentRow);
        }
    }

    public PlacePlant (plant : Plant) {
        var currentCell : Element = document.querySelector(
            `#field > tr:nth-child(${plant.location.row}) >
            td:nth-child(${plant.location.col})`)
            || document.createElement("td");

        var currentEntity : Element = document.createElement("img");
        currentEntity.setAttribute("src", `../media/${plant.name}.png`);
        currentEntity.classList.add(`${plant.name}`);

        currentCell.appendChild(currentEntity);
    }
}