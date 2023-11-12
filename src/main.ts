import { CanvasDrawer } from "./canvas/canvas";
import { Cell } from "./models/cell";
import { Grid } from "./models/grid";
import "./style.css";
import { updateGrid } from "./updater/updater";

const createEmptyGrid = (width: number, height: number): Grid => {
	const spaceCell: Cell = { type: "space", potential: 0 };
	return {
		width,
		height,
		cells: Array.from({ length: width }, () => Array.from({ length: height }, () => ({ ...spaceCell }))),
	};
};

const canvas = <HTMLCanvasElement | null>document.getElementById("canvas");
if (!canvas) throw new Error("Canvas not found");
const drawer = new CanvasDrawer(canvas);

const framerate = 10;

let grid = createEmptyGrid(4, 4);

const init = () => {
	grid.cells[1][1] = { type: "object", potential: 250 };
	grid.cells[3][3] = { type: "object", potential: 250 };
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
