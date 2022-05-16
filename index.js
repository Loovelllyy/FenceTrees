import { Circles2Solver } from './handlers/ClassCircles2Solver'
import {C} from "./handlers/ClassC";
import {P} from "./handlers/ClassPoint";

const startBtn = document.getElementById("startBtn1");
const inputTreeX = document.getElementById("inputTreeX");
const inputTreeY = document.getElementById("inputTreeY");
const inputRadius = document.getElementById("inputRadius");
const outputsValues = document.querySelectorAll(".outputValues");
const btnInput = document.getElementById("btnInput")
const container = document.querySelector(".container");
const inputZoom = document.getElementById("inputZoom");

let height = 1000;
let width = 1000;
let zoom = 1;

let baseLine = 25;
const baseWidth = 1000;

const baseHeight = 1000;

let canvas;
let layer;
// let sandro;
let circleCold;
let treesCoor = [];

const toScreen = ({x, y}) => {
    let xScreen = width / 2 + x * baseLine * zoom;
    let yScreen = height / 2 - y * baseLine * zoom;
    return {x: xScreen, y: yScreen}
};

function render() {

    canvas = new Konva.Stage({container: "root", height, width});
    layer = new Konva.Layer();

    canvas.clear();


    canvas.add(layer);
    let center = toScreen({x: 0, y: 0});
    for (let y = 1; ; y++) {
        const point = toScreen({x: 0, y});
        if (point.y < 0) break;
        const lineX = new Konva.Line({
            points: [0, point.y, width, point.y], stroke: 'black',
            strokeWidth: 1,
            lineCap: 'round',
            lineJoin: 'round',
        })
        layer.add(lineX);
    }

    for (let y = -1; ; y--) {
        const point = toScreen({x: 0, y});
        if (point.y > height) break;
        const lineX = new Konva.Line({
            points: [0, point.y, width, point.y], stroke: 'black',
            strokeWidth: 1,
            lineCap: 'round',
            lineJoin: 'round',
        })
        layer.add(lineX);
    }

    for (let x = 1; ; x++) {
        const point = toScreen({x, y: 0});
        if (point.x > width) break;
        const lineY = new Konva.Line({
            points: [point.x, 0, point.x, height], stroke: 'black',
            strokeWidth: 1,
            lineCap: 'round',
            lineJoin: 'round',
        })
        layer.add(lineY);
    }

    for (let x = -1; ; x--) {
        const point = toScreen({x, y: 0});
        if (point.x < 0) break;
        const lineY = new Konva.Line({
            points: [point.x, 0, point.x, height], stroke: 'black',
            strokeWidth: 1,
            lineCap: 'round',
            lineJoin: 'round',
        })
        layer.add(lineY);
    }

    const oX = new Konva.Line({
        points: [0, center.y, width, center.y], stroke: 'black',
        strokeWidth: 3,
        lineCap: 'round',
        lineJoin: 'round',
    })// горизотальная линия
    layer.add(oX);

    const oY = new Konva.Line({
        points: [center.x, 0, center.x, height], stroke: 'black',
        strokeWidth: 3,
        lineCap: 'round',
        lineJoin: 'round',
    })// вертикальная линия
    layer.add(oY);

    getTrees(treesCoor);

    container.scrollTop = container.scrollHeight / 6;
    container.scrollLeft = container.scrollWidth / 6;
}

const getTrees = (treesCoor) => {
    treesCoor.forEach((treeCoor) => {
        circleCold = new Konva.Circle({
            ...toScreen(treeCoor),
            radius: treeCoor.radius * baseLine * zoom,
            stroke: 'green',
            strokeWidth: 3,
        });
        layer.add(circleCold);
    })
}

function getFencePoint(arrFence) {
    arrFence.forEach((point) => {
        const pointFence = new Konva.Circle({
            ...toScreen(point),
            radius: (baseLine / 2) * zoom,
            fill: 'brown',
        })
        layer.add(pointFence)
    })
}

function getTriangle(arrPoints) {
    let arr = []
    arrPoints.forEach(point => {
        arr.push(toScreen(point))
    })
        const top = new Konva.Line({
            points: [arr[0].x, arr[0].y, arr[1].x, arr[1].y, arr[2].x, arr[2].y],
            fill: 'rgba(77,26,26,0.32)',
            stroke: 'black',
            strokeWidth: 3,
            closed: true,
        });

    layer.add(top)

    // })
}

render();

inputZoom.addEventListener("change", (ev) => {
    zoom = ev.target.value / 100;
    height = Math.max(baseHeight * zoom, height);
    width = Math.max(baseWidth * zoom, width);
    render();
    getResult();
})

btnInput.addEventListener("click", () => {
    let childOutput = document.createElement("p");

    let treeCoor = {x: +inputTreeX.value, y: +inputTreeY.value, radius: +inputRadius.value};

    treesCoor.push(treeCoor);

    childOutput.textContent = `(${treeCoor.x}, ${treeCoor.y}), radius: ${treeCoor.radius}`;
    childOutput.classList.add("aligning");

    render();

    outputsValues[1].appendChild(childOutput);

    inputTreeX.value = "";
    inputTreeY.value = "";
    inputRadius.value = "";

})

const getResult = () => {
    const c1 = new C(new P(treesCoor[0].x, treesCoor[0].y), treesCoor[0].radius)
    const c2 = new C(new P(treesCoor[1].x, treesCoor[1].y), treesCoor[1].radius)
    const c3 = new C(new P(treesCoor[2].x, treesCoor[2].y), treesCoor[2].radius)

    let solver = new Circles2Solver(113);
    let triangle = solver.getValidTriangle(c1, c2, c3);

    if (triangle.length === 0) outputsValues[3].textContent = 'impossible';
    else {
        getFencePoint(triangle);
        getTriangle(triangle);
        let str = ''
        for (let i = 0; i < triangle.length; i++) {
            str += `(${Math.round(triangle[i].x * 100) / 100}; ${Math.round(triangle[i].y * 100) / 100}) \n`;
            outputsValues[3].textContent = str;
        }
    }
}

startBtn.addEventListener("click", () => {
    getResult()
})
