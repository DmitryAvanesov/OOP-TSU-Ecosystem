class UI {
    public CreateMap (cells : Array<Array<Cell>>) {
        var currentMap : Element = document.querySelector("#map") || document.createElement("div");

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

    public PlaceEntities (entities : Array<Entity>) {
        entities.forEach(function (entityItem : Entity) {
            var currentCell : Element = document.querySelector(
                `#map > tr:nth-child(${entityItem.location.row}) >
                td:nth-child(${entityItem.location.col})`)
                || document.createElement("td");

            var currentEntity : Element = document.createElement("img");
            currentEntity.setAttribute("src", `../media/${entityItem.name}.png`);
            currentEntity.classList.add(`${entityItem.name}`);

            currentCell.appendChild(currentEntity);
        });
    }
}