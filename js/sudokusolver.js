class DataGrid {
    constructor() {
        this.data = [];
        this.cells = [];
        for(let i = 0; i < 9; i++) {
            this.data.push([]);
            this.cells.push([]);
            for(let j = 0; j < 9; j++) {
                this.data[i].push(0);
                this.cells[i].push([]);
            }
        }

        let grid = document.getElementById("grid");
        for(let i = 0; i < 9; i++) {
            let box = document.createElement("div");
            box.className = "box";
            for(let j = 0; j < 9; j++) {
                let x = i % 3 * 3 + j % 3;
                let y = Math.floor(i / 3) * 3 + Math.floor(j / 3);

                let cell = document.createElement("input");
                cell.type = "text";
                cell.className = "cell";
                cell.maxLength = 1;
                cell.oninput = function() {
                    cell.value = /^[1-9]?$/.test(cell.value) ? cell.value : "";
                    cell.classList.add("user-input");
                };
                cell.onblur = function() {
                    dataGrid.changeValue(x, y, cell.value == "" ? 0 : cell.value);
                    if(cell.value == "") {
                        cell.classList.remove("user-input");
                    }
                };
                box.appendChild(cell);

                this.cells[x][y] = cell;
            }
            grid.appendChild(box);
        }
    }
    changeValue(x, y, value) {
        this.data[x][y] = parseInt(value);
    }
    getData() {
        return this.data;
    }
    updateData(data) {
        if(data) {
            this.data = data;
            for(let x = 0; x < 9; x++) {
                for(let y = 0; y < 9; y++) {
                    this.cells[x][y].value = this.data[x][y];
                }
            }
        } else {
            for(let x = 0; x < 9; x++) {
                for(let y = 0; y < 9; y++) {
                    this.data[x][y] = 0;
                    this.cells[x][y].value = "";
                    this.cells[x][y].classList.remove("user-input");
                }
            }
        }
    }
}

class Sudoku {
    constructor(data) {
        this.data = data;
    }
    areColumnsValid() {
        for(let x = 0; x < 9; x++) {
            let counts = {};
            for(let y = 0; y < 9; y++) {
                let num = this.data[x][y];
                if(num != 0) {
                    counts[num] = (counts[num] || 0) + 1;
                    if(counts[num] > 1) {
                        return false;
                    }
                }
            }
        }
        return true;
    }
    areRowsValid() {
        for(let y = 0; y < 9; y++) {
            let counts = {};
            for(let x = 0; x < 9; x++) {
                let num = this.data[x][y];
                if(num != 0) {
                    counts[num] = (counts[num] || 0) + 1;
                    if(counts[num] > 1) {
                        return false;
                    }
                }
            }
        }
        return true;
    }
    areBoxesValid() {
        for(let box = 0; box < 9; box++) {
            let startX = box % 3 * 3;
            let startY = Math.floor(box / 3) * 3;
            let counts = {};
            for(let x = startX; x < startX + 3; x++) {
                for(let y = startY; y < startY + 3; y++) {
                    let num = this.data[x][y];
                    if(num != 0) {
                        counts[num] = (counts[num] || 0) + 1;
                        if(counts[num] > 1) {
                            return false;
                        }
                    }
                }
            }
        }
        return true;
    }
    isValid() {
        return this.areColumnsValid() && this.areRowsValid() && this.areBoxesValid();
    }
    isNumInColumn(x, n) {
        for(let y = 0; y < 9; y++) {
            if(this.data[x][y] == n) {
                return true;
            }
        }
        return false;
    }
    isNumInRow(y, n) {
        for(let x = 0; x < 9; x++) {
            if(this.data[x][y] == n) {
                return true;
            }
        }
        return false;
    }
    isNumInBox(x, y, n) {
        let startX = Math.floor(x / 3) * 3;
        let startY = Math.floor(y / 3) * 3;
        for(let x = startX; x < startX + 3; x++) {
            for(let y = startY; y < startY + 3; y++) {
                if(this.data[x][y] == n) {
                    return true;
                }
            }
        }
        return false;
    }
    isNumValid(x, y, n) {
        return !this.isNumInColumn(x, n) && !this.isNumInRow(y, n) && !this.isNumInBox(x, y, n);
    }
    solve() {
        for(let x = 0; x < 9; x++) {
            for(let y = 0; y < 9; y++) {
                if(this.data[x][y] == 0) {
                    for(let n = 1; n <= 9; n++) {
                        if(this.isNumValid(x, y, n)) {
                            this.data[x][y] = n;

                            if(this.solve()) {
                                return true;
                            } else {
                                this.data[x][y] = 0;
                            }
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }
    getData() {
        return this.data;
    }
}

let dataGrid;

function init() {
    dataGrid = new DataGrid();
}

function clearGrid() {
    dataGrid.updateData();
}

function solveGrid() {
    let sudoku = new Sudoku(dataGrid.getData());
    let error = document.getElementById("error");
    if(sudoku.isValid()) {
        if(sudoku.solve()) {
            dataGrid.updateData(sudoku.getData());
            error.classList.add("hidden");
        } else {
            error.classList.remove("hidden");
        }
    } else {
        error.classList.remove("hidden");
    }
}