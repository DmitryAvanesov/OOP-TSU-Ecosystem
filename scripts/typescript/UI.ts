class UI {
    public CreateMap(cells : Array<Array<Cell>>) {
        var currentMap = document.querySelector("#map");

        for (var i = 0; i < cells.length; i++) {
            var currentRow = document.createElement("tr");

            for (var j = 0; j < cells[i].length; j++) {
                var currentCell = document.createElement("td");
                currentCell.classList.add("cell");
                currentRow.appendChild(currentCell);
            }

            currentMap?.appendChild(currentRow);
        }
    }
}