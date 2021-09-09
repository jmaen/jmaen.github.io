/*
FIXME:
- init(): reset table & sketch

- bias data

- configuration:
-- activation functions (sigmoid - only target values in [0; 1])
-- learning rate

- validateInput():

TODO:
- radio button css

- improve sketch svg

- accuracy plot (right column)
*/

class Configuration {
    shape = [3, 2, 2];
    hiddenActivation;
    outputActivation;
    learningRate = 0.1;
    epochCount = 0;

    numberInputs = [];
    epochLabel = document.getElementById("epoch-label");

    constructor() {
        for(let layerIdx = 0; layerIdx < 3; layerIdx++) {
            this.numberInputs.push(document.getElementById(`number-input-${layerIdx}`));
            this.numberInputs[layerIdx].innerHTML = this.shape[layerIdx];
        }

        let epochString = this.epochCount.toString();
        epochString = epochString.padStart(6, "0");
        epochString = epochString.substr(0, 3) + " " + epochString.substr(3, 6);
        this.epochLabel.innerHTML = epochString;
    }
    changeShape(layerIdx, amount) {
        let newValue = this.shape[layerIdx] + amount;
        if(newValue > 0 && !((layerIdx == 0 && newValue > 5) || (layerIdx == 1 && newValue > 4) || (layerIdx == 2 && newValue > 3))) {
            this.shape[layerIdx] = newValue;
            this.numberInputs[layerIdx].innerHTML = this.shape[layerIdx];
            init();
        }
    }
    getShape() {
        return this.shape;
    }
    getHiddenActivation() {
    }
    getOutputActivation() {
        
    }
    getLearningRate() {
        return this.learningRate;
    }
    increaseEpochCount() {
        this.epochCount += 1;

        let epochString = this.epochCount.toString();
        epochString = epochString.padStart(6, "0");
        epochString = epochString.substr(0, 3) + " " + epochString.substr(3, 6);
        this.epochLabel.innerHTML = epochString;
    }
    resetEpochCount() {
        this.epochCount = 0;

        let epochString = this.epochCount.toString();
        epochString = epochString.padStart(6, "0");
        epochString = epochString.substr(0, 3) + " " + epochString.substr(3, 6);
        this.epochLabel.innerHTML = epochString;
    }
}

class DataTable {
    constructor(table, inputSize, outputSize) {
        this.table = table;
        this.inputSize = inputSize;
        this.outputSize = outputSize;
        this.rows = [];
        this.radios = [];

        var row = this.table.insertRow();
        for(var i = 0; i < this.inputSize + this.outputSize; i++) {
            var header = document.createElement("th");
            if(i == 0) {
                header.innerHTML = "Input";
            } else if(i == this.inputSize) {
                header.innerHTML = "Output";
                header.setAttribute("class", "padding-left");
            }
            row.appendChild(header);
        }
    }
    addRow(input, output) {
    if(!input) {
            input = [];
            for(var i = 0; i < this.inputSize; i++) {
                input.push("0");
            }
        }
        if(!output) {
            output = [];
            for(var i = 0; i < this.outputSize; i++) {
                output.push("0");
            }
        }        
        if(input.length != this.inputSize) {
            throw "Wrong input dimension!";
        }
        if(output.length != this.outputSize) {
            throw "Wrong output dimension!";
        }

        var index = this.rows.length;
        var row = this.table.insertRow();
        this.rows.push([]);
        
        for(var i = 0; i < this.inputSize; i++) {
            var inputField = document.createElement("input");
            inputField.setAttribute("type", "text");
            inputField.setAttribute("value", input[i]);
            inputField.setAttribute("onkeydown", "return validateInput(event)");
            inputField.setAttribute("onfocusout", "return validateValue(event)");
            var cell = row.insertCell();
            cell.appendChild(inputField);
            this.rows[index].push(inputField);
        }
    
        for(var i = 0; i < this.outputSize; i++) {
            var outputField = document.createElement("input");
            outputField.setAttribute("type", "text");
            outputField.setAttribute("value", output[i]);
            outputField.setAttribute("onkeydown", "return validateInput(event)");
            outputField.setAttribute("onfocusout", "return validateValue(event)");
            var cell = row.insertCell();
            if(i == 0) {
                cell.setAttribute("class", "padding-left");
            }
            cell.appendChild(outputField);
            this.rows[index].push(outputField);
        }
    
        var radio = document.createElement("input");
        radio.setAttribute("type", "radio");
        radio.setAttribute("name", "currentRow");
        radio.setAttribute("onclick", "sketch.update(" + index + ")");
        radio.setAttribute("disabled", true);
        var checkmark = document.createElement("span");
        checkmark.setAttribute("class", "checkmark");
        var container = document.createElement("div");
        container.setAttribute("class", "radio");
        container.appendChild(radio);
        container.appendChild(checkmark);
        var cell = row.insertCell();
        cell.appendChild(container);
        this.radios.push(radio);

        if(this.rows.length > 2) {
            var removeButton = document.getElementById("remove-button");
            removeButton.disabled = false;
        }
        if(this.rows.length > 9) {
            var addButton = document.getElementById("add-button");
            addButton.disabled = true;
        }

        if(this.getCurrentRow() == -1) {
            this.radios[0].checked = true;
        }
    }
    removeRow() {
        var row = this.rows[this.rows.length - 1][0].parentNode.parentNode;
        row.parentNode.removeChild(row);
        this.rows.pop();
        this.radios.pop();

        if(this.rows.length <= 2) {
            var removeButton = document.getElementById("remove-button");
            removeButton.disabled = true;
        }
        if(this.rows.length <= 9) {
            var addButton = document.getElementById("add-button");
            addButton.disabled = false;
        }  

        if(this.getCurrentRow() == -1) {
            this.radios[0].checked = true;
        }
    }
    randomizeValues() {
        for(var i = 0; i < this.rows.length; i++) {
            for(var j = 0; j < this.inputSize + this.outputSize; j++) {
                var value = Math.floor(Math.random() * 1000) / 100;
                value *= Math.round(Math.random()) ? 1 : -1;
                this.rows[i][j].value = value;
            }
        }
    }
    disable() {
        for(var i = 0; i < this.rows.length; i++) {
            for(var j = 0; j < this.inputSize + this.outputSize; j++) {
                this.rows[i][j].disabled = true;
            }
        }
        for(var i = 0; i < this.radios.length; i++) {
            this.radios[i].disabled = false;
        }
        var addButton = document.getElementById("add-button");
        addButton.disabled = true;
        var removeButton = document.getElementById("remove-button");
        removeButton.disabled = true;
        var randomizeButton = document.getElementById("randomize-button");
        randomizeButton.disabled = true;
        var label = document.getElementById("table-label");
        label.hidden = false;
    }
    enable() {
        for(var i = 0; i < this.rows.length; i++) {
            for(var j = 0; j < this.inputSize + this.outputSize; j++) {
                this.rows[i][j].disabled = false;
            }
        }
        for(var i = 0; i < this.radios.length; i++) {
            this.radios[i].disabled = true;
        }
        if(this.rows.length <= 9) {
            var addButton = document.getElementById("add-button");
            addButton.disabled = false;
        }
        if(this.rows.length > 2) {
            var removeButton = document.getElementById("remove-button");
            removeButton.disabled = false;
        }
        var randomizeButton = document.getElementById("randomize-button");
        randomizeButton.disabled = false;
        var label = document.getElementById("table-label");
        label.hidden = true;
    }
    getInputs() {
        let inputs = [];
        for(let row = 0; row < this.rows.length; row++) {
            let input = [];
            for(let i = 0; i < this.inputSize; i++) {
                input.push(this.rows[row][i].value);
            }
            inputs.push(input);
        }
        return inputs;
    }
    getOutputs() {
        let outputs = [];
        for(let row = 0; row < this.rows.length; row++) {
            let output = [];
            for(let i = this.inputSize; i < this.inputSize + this.outputSize; i++) {
                output.push(this.rows[row][i].value);
            }
            outputs.push(output);
        }
        return outputs;
    }
    getCurrentRow() {
        for(var i = 0; i < this.radios.length; i++) {
            if(this.radios[i].checked) {
                return i;
            }
        }
        return -1;
    }
}

class Sketch {
    constructor(svg, inputSize, hiddenSize, outputSize) {
        this.svg = svg;
        this.inputSize = inputSize;
        this.hiddenSize = hiddenSize;
        this.outputSize = outputSize;
        this.layerSizes = [this.inputSize, this.hiddenSize, this.outputSize];
        this.paths = [];
        this.titles = [];
        this.circles = [];
        this.texts = [];
        this.values = [];
        this.weights = [];
    }
    draw() {
        var namespace = "http://www.w3.org/2000/svg";
        
        var radius = 25;
        var padding = 25;
        var spacingX = 200;
        var spacingY = 100;
        var spacingBias = spacingY + radius;
        var center0 = ((this.layerSizes[0] - 1) * spacingY) / 2;
        var distanceY = ((this.layerSizes[0] - 1) * spacingY) + spacingBias;

        this.svg.setAttribute("height", 2 * padding + distanceY + 2 * radius);
        this.svg.setAttribute("width", 2 * padding + 2 * spacingX + 2 * radius);
        for(var i = 0; i < 2; i++) {
            this.paths.push([]);
            this.titles.push([]);

            var centerI = ((this.layerSizes[i] - 1) * spacingY) / 2;
            var offset1 = center0 - centerI;
            var centerII = ((this.layerSizes[i + 1] - 1) * spacingY) / 2;
            var offset2 = center0 - centerII;
            for(var j = 0; j < this.layerSizes[i + 1]; j++) {
                this.paths[i].push([]);
                this.titles[i].push([]);
                for(var k = 0; k < this.layerSizes[i]; k++) {
                    var title = document.createElementNS(namespace, "title");
                    var path = document.createElementNS(namespace, "path");
                    var x1 = padding + i * spacingX + 2 * radius;
                    var x2 = padding + (i + 1) * spacingX;
                    var y1 = padding + k * spacingY + offset1 + radius;
                    var y2 = padding + j * spacingY + offset2 + radius;
                    path.setAttribute("d", `M ${x1} ${y1} Q ${(x2 - x1) / 4 + x1} ${y1} ${(x2 - x1) / 2 + x1} ${(y2 - y1) / 2 + y1} T ${x2} ${y2}`);
                    path.setAttribute("stroke-width", 3);
                    path.setAttribute("fill", "none");
                    path.appendChild(title);
                    this.svg.appendChild(path);
                    this.paths[i][j].push(path);
                    this.titles[i][j].push(title);
                }
                var title = document.createElementNS(namespace, "title");
                var path = document.createElementNS(namespace, "path");
                var x1 = padding + i * spacingX + 2 * radius;
                var x2 = padding + (i + 1) * spacingX;
                var y1 = padding + distanceY + radius;
                var y2 = padding + j * spacingY + offset2 + radius;
                path.setAttribute("d", `M ${x1} ${y1} Q ${(x2 - x1) / 4 + x1} ${y1} ${(x2 - x1) / 2 + x1} ${(y2 - y1) / 2 + y1} T ${x2} ${y2}`);
                path.setAttribute("stroke-width", 3);                    
                path.setAttribute("fill", "none");
                path.appendChild(title);
                this.svg.appendChild(path);
                this.paths[i][j].push(path);
                this.titles[i][j].push(title);
            }
        }

        for(var i = 0; i < 3; i++) {
            this.circles.push([]);
            this.texts.push([]);

            var centerI = ((this.layerSizes[i] - 1) * 100) / 2;
            var offset = center0 - centerI;
            for(var j = 0; j < this.layerSizes[i]; j++) {
                var x = padding + i * spacingX + radius;
                var y = padding + j * spacingY + offset + radius;

                var circle = document.createElementNS(namespace, "circle");
                circle.setAttribute("cx", x);
                circle.setAttribute("cy", y);
                circle.setAttribute("r", radius);
                this.svg.appendChild(circle);
                this.circles[i].push(circle);

                var text = document.createElementNS(namespace, "text");
                text.setAttribute("x", x);
                text.setAttribute("y", y);
                text.setAttribute("dominant-baseline", "middle");
                text.setAttribute("text-anchor", "middle");
                this.svg.appendChild(text);
                this.texts[i].push(text);
            }
            if(i != 2) {
                var circle = document.createElementNS(namespace, "circle");
                var x = padding + i * spacingX + radius;
                var y = padding + distanceY + radius;
                circle.setAttribute("cx", x);
                circle.setAttribute("cy", y);
                circle.setAttribute("r", radius);
                this.svg.appendChild(circle);
                this.circles[i].push(circle);
            }
        }
    }
    update(currentRow) {
        var currentValues = this.values[currentRow];
        
        for(var i = 0; i < 2; i++) {
            for(var j = 0; j < this.layerSizes[i + 1]; j++) {
                for(var k = 0; k < this.layerSizes[i] + 1; k++) {
                    var weight = this.weights[i][j][k];
                    var path = this.paths[i][j][k];
                    path.setAttribute("class", weight > 0 ? "path-blue" : "path-red");
                    path.setAttribute("stroke-width", 3 * Math.abs(weight));
                    this.titles[i][j][k].innerHTML = weight;
                }
            }
        }

        for(var i = 0; i < 3; i++) {
            for(var j = 0; j < this.layerSizes[i]; j++) {
                this.texts[i][j].innerHTML = Math.round((currentValues[i][j] + Number.EPSILON) * 1000) / 1000;
            }
        }
    }
    disable() {
        for(var i = 0; i < 2; i++) {
            for(var j = 0; j < this.layerSizes[i + 1]; j++) {
                for(var k = 0; k < this.layerSizes[i] + 1; k++) {
                    var path = this.paths[i][j][k];
                    path.setAttribute("class", "path-neutral");
                    path.setAttribute("stroke-width", 2);
                    this.titles[i][j][k].innerHTML = "";
                }
            }
        }

        for(var i = 0; i < 3; i++) {
            for(var j = 0; j < this.layerSizes[i]; j++) {
                this.texts[i][j].innerHTML = "";
            }
        }
    }
    setValues(values) {
        // TODO check dimensions
        this.values = values;
    }
    setWeights(weights) {
        // TODO check dimensions
        this.weights = weights;
    }
}

let config = new Configuration();
var dataTable;
var sketch;
var network;

var isTraining = false;
var isTrained = false;

// run on load & when shape or activations are updated
// FIXME reset table & sketch
function init() {
    let shape = config.getShape();
    table = document.getElementById("data-table");
    dataTable = new DataTable(table, shape[0], shape[2]);
    for(var i = 0; i < 2; i++) {
        var input = [];
        for(var j = 0; j < shape[0]; j++) {
            input.push(Math.random() > 0.5 ? 1 : 0);
        }
        var output = [];
        for(var j = 0; j < shape[2]; j++) {
            output.push(Math.random() > 0.5 ? 1 : 0);
        }
        dataTable.addRow(input, output);
    }

    svg = document.getElementById("sketch");
    sketch = new Sketch(svg, shape[0], shape[1], shape[2]);
    sketch.draw();
    sketch.disable();

    network = new Network(shape, Activations.TanH, Activations.Sigmoid);
}

function toggle() {
    let iconPath = document.getElementById("center-icon-path");

    if(!isTraining) {
        iconPath.setAttribute("d", "M6 19h4V5H6v14zm8-14v14h4V5h-4z");

        isTraining = true;

        // TODO disable step

        train();
    } else {
        iconPath.setAttribute("d", "M8 5v14l11-7z");

        isTraining = false;

        // TODO enable step
    }
}

function train() {
    if(isTraining) {
        step();
        setTimeout(train, 25);
    }
}

function step() {
    if(!isTrained) {
        dataTable.disable();

        isTrained = true;
    }

    let inputs = dataTable.getInputs();
    let targets = dataTable.getOutputs();
    network.train(inputs, targets, config.getLearningRate());
    
    let outputs = [];
    for(let i = 0; i < inputs.length; i++) {
        network.forwardProp(inputs[i]);
        outputs.push(network.getOutputs());
    }
    let weights = network.getWeights();

    sketch.setValues(outputs);
    sketch.setWeights(weights);
    sketch.update(dataTable.getCurrentRow());

    config.increaseEpochCount();
}

function showResetModal() {
    modal = document.getElementById("modal");
    modal.style.display = "flex";
}

function hideResetModal() {
    modal = document.getElementById("modal");
    modal.style.display = "none";
}

function reset() {
    if(isTraining) {
        let iconPath = document.getElementById("center-icon-path");
        iconPath.setAttribute("d", "M8 5v14l11-7z");

        isTraining = false;
    }
    dataTable.enable();
    sketch.disable();
    config.resetEpochCount();
    // TODO network.reset();

    isTrained = false;
}

// TODO move to DataTable class
function validateInput(event) {
    // TODO -
    var key = event.key;
    var validValues = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "-"];
    var validActions = ["Backspace", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowUp"];
    if(!validValues.includes(key) && !validActions.includes(key)) {
        event.preventDefault();
    }
    var value = event.target.value;
    var cursorIndex = event.target.selectionStart;
    if(!validActions.includes(key)) {
        if(value.includes("-")) {
            if(key == "-" && cursorIndex != 0) {
                event.preventDefault();
            }
        }

        if(value.includes(".")) {
            if(key == ".") {
                event.preventDefault();
            }
            var decimalIndex = value.indexOf(".");
            var splitValue = value.split(".");
            if(cursorIndex <= decimalIndex) {
                if(splitValue[0].length >= 1 && key != "-") {
                    event.preventDefault();
                }
            } else {
                if(splitValue[1].length >= 2) {
                    event.preventDefault();
                }
            }
        } else {
            if(key != "." && key != "-" && value.length >= 1) {
                event.preventDefault();
            }  
        }
    }
}

function validateValue(event) {
    var value = event.target.value;
    if(value == "" || value == "." || value == "-") {
        event.target.value = 0;
    }
}