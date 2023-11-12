import { CanvasDrawer } from "./canvas/canvas";
import { createEmptyGrid, drawRectangularToGrid, upscaleGrid } from "./generator/generator";
import { Grid } from "./models/grid";
import "./style.css";
import { updateGrid } from "./updater/updater";

const canvas = <HTMLCanvasElement | null>document.getElementById("canvas");
if (!canvas) throw new Error("Canvas not found");
const drawer = new CanvasDrawer(canvas);

const framerate = 0.5;

let grid: Grid;

const generateSimpleGrid = () => {
	grid = createEmptyGrid(4, 4);
	grid = drawRectangularToGrid(grid, { type: "object", potential: 100 }, 1, 1, 1, 1);
	grid = drawRectangularToGrid(grid, { type: "object", potential: 200 }, 3, 3, 1, 1);
	return grid;
};

const init = () => {
	grid = createEmptyGrid(16, 16);
	grid = drawRectangularToGrid(grid, { type: "object", potential: 100 }, 2, 2, 2, 2);
	grid = drawRectangularToGrid(grid, { type: "object", potential: 200 }, 8, 8, 2, 2);
	grid = drawRectangularToGrid(grid, { type: "object", potential: 80 }, 2, 8, 1, 2);
	grid = upscaleGrid(grid, 4);
	grid = generateSimpleGrid();
	console.log(grid);
};

const update = () => {
	grid = updateGrid(grid);
	console.log(grid);
	drawer.clear();
	drawer.draw(grid);
};

init();
setInterval(() => update(), 1000 / framerate);
