// TODO rename link -> weight

class Neuron {
    activation;

    inputLinks = [];
    outputLinks = [];
    bias = 0.1;

    output;
    derivative;
    error;

    constructor(activation) {
        this.activation = activation;
    }

    updateOutput() {
        let input = this.bias;
        for(let link of this.inputLinks) {
            input += link.weight * link.source.output;
        }
        this.output = this.activation.output(input);
        this.derivative = this.activation.derivative(input);
    }

    updateError() {
        let sum = 0;
        for(let link of this.outputLinks) {
            sum += link.destination.error * link.weight;
        }
        this.error = this.derivative * sum;
    }

    updateWeights(learningRate) {
        for(let linkIdx = 0; linkIdx < this.outputLinks.length; linkIdx++) {
            let nextNeuron = this.outputLinks[linkIdx].destination;
            let delta = -learningRate * nextNeuron.error * this.output;
            this.outputLinks[linkIdx].weight += delta;
            nextNeuron.inputLinks[linkIdx].weight += delta;
            nextNeuron.bias += -learningRate * nextNeuron.error;
        }
    }
}

class Link {
    source;
    destination;

    weight = Math.random() - 0.5;

    constructor(source, destination) {
        this.source = source;
        this.destination = destination;
    }
}

class Linear {
    output(x) {
        return x;
    }
    derivative(x) {
        return 1;
    }
}

class Sigmoid {
    output(x) {
        return 1 / (1 + Math.exp(-x));
    }
    derivative(x) {
        let output = this.output(x);
        return output * (1 - output);
    }
}

class TanH {
    output(x) {
        let sinH = Math.exp(x);
        let cosH = Math.exp(-x);
        return (sinH - cosH) / (sinH + cosH);
    }
    derivative(x) {
        let output = this.output(x);
        return 1 - output * output;
    }
}

class ReLU {
    output(x) {
        return x > 0 ? x : 0;
    }
    derivative(x) {
        return x > 0 ? 1 : 0;
    }
}

class Activations {
    static Linear = new Linear();
    static Sigmoid = new Sigmoid();
    static TanH = new TanH();
    static ReLU = new ReLU();
}

class Network {
    neurons = [[], [], []];

    constructor(shape, hiddenActivation, outputActivation) {
        for(let layerIdx = 0; layerIdx < 3; layerIdx++) {
            for(let neuronIdx = 0; neuronIdx < shape[layerIdx]; neuronIdx++) {
                let activation;
                if(layerIdx == 0) {
                    activation = null;
                } else {
                    activation = layerIdx == 1 ? hiddenActivation : outputActivation;
                }
                let currentNeuron = new Neuron(activation);

                if(layerIdx > 0) {
                    for(let prevNeuron of this.neurons[layerIdx - 1]) {
                        let currentLink = new Link(prevNeuron, currentNeuron);
                        currentNeuron.inputLinks.push(currentLink);
                        prevNeuron.outputLinks.push(currentLink);
                    }
                }

                this.neurons[layerIdx].push(currentNeuron);
            }
        }
    }

    forwardProp(input) {
        for(let neuronIdx = 0; neuronIdx < this.neurons[0].length; neuronIdx++) {
            this.neurons[0][neuronIdx].output = input[neuronIdx];
        }
        for(let layerIdx = 1; layerIdx < 3; layerIdx++) {
            for(let neuronIdx = 0; neuronIdx < this.neurons[layerIdx].length; neuronIdx++) {
                this.neurons[layerIdx][neuronIdx].updateOutput();
            }
        }
    }

    backProp(target) {
        for(let neuronIdx = 0; neuronIdx < this.neurons[2].length; neuronIdx++) {
            let neuron = this.neurons[2][neuronIdx];
            neuron.error = neuron.derivative * (neuron.output - target[neuronIdx]);
        }
        for(let neuronIdx = 0; neuronIdx < this.neurons[1].length; neuronIdx++) {
            this.neurons[1][neuronIdx].updateError();
        }
    }

    updateWeights(learningRate) {
        for(let layerIdx = 0; layerIdx < 2; layerIdx++) {
            for(let neuronIdx = 0; neuronIdx < this.neurons[layerIdx].length; neuronIdx++) {
                this.neurons[layerIdx][neuronIdx].updateWeights(learningRate);
            }
        }
    }

    train(inputs, targets, learningRate) {
        for(let i = 0; i < inputs.length; i++) {
            this.forwardProp(inputs[i]);
            this.backProp(targets[i]);
            this.updateWeights(learningRate);
        }
    }

    getOutputs() {
        let outputs = [[], [], []];
        for(let layerIdx = 0; layerIdx < 3; layerIdx++) {
            for(let neuronIdx = 0; neuronIdx < this.neurons[layerIdx].length; neuronIdx++) {
                outputs[layerIdx].push(this.neurons[layerIdx][neuronIdx].output);
            }
        }
        return outputs;
    }

    getWeights() {
        let weights = [[], []];
        for(let layerIdx = 1; layerIdx < 3; layerIdx++) {
            for(let neuronIdx = 0; neuronIdx < this.neurons[layerIdx].length; neuronIdx++) {
                let links = this.neurons[layerIdx][neuronIdx].inputLinks;
                let currentWeights = [];
                for(let linkIdx = 0; linkIdx < links.length; linkIdx++) {
                    currentWeights.push(links[linkIdx].weight);
                }
                // currentWeights.push(bias);
                weights[layerIdx - 1].push(currentWeights);
            }
        }
        return weights;
    }
}

// let network = new Network([3, 2, 1], Activations.TanH, Activations.Sigmoid);
// let input = [[1, 0, 0.7], [0.3, 0.2, 1]];
// let target = [[0.4], [0.9]];
// network.forwardProp(input[0]);
// console.log(network.getOutputs());
// console.log(network.getWeights());
// network.forwardProp(input[1]);
// console.log(network.getOutputs());
// console.log(network.getWeights());
// for(let i = 0; i < 100000; i++) {
//     network.train(input[0], target[0], 0.1);
//     network.train(input[1], target[1], 0.1);
// }
// network.forwardProp(input[0]);
// console.log(network.getOutputs());
// console.log(network.getWeights());
// network.forwardProp(input[1]);
// console.log(network.getOutputs());
// console.log(network.getWeights());