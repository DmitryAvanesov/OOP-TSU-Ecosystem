class UI {
    public CreateMap(cells : Array<Array<Cell>>) {
        var currentMap : Element = document.querySelector("#map") || document.createElement("div");

        for (var i = 0; i < cells.length; i++) {
            var currentRow : Element = document.createElement("tr");

            for (var j = 0; j < cells[i].length; j++) {
                var currentCell : Element = document.createElement("td");
                currentCell.classList.add("cell");
                currentRow.appendChild(currentCell);
            }

            currentMap?.appendChild(currentRow);
        }
    }
}