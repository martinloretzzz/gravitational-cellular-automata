import { CanvasDrawer } from "./canvas/canvas";
import { drawRectangularToGrid, upscaleGrid } from "./generator/generator";
import { ObjectCellGroup as CellGroup } from "./models/body";
import { Cell } from "./models/cell";
import { Grid, ZeroPadGrid } from "./models/grid";
import "./style.css";
import { updateGrid } from "./updater/updater";
import { forEveryCell } from "./util/util";

const canvas = <HTMLCanvasElement | null>document.getElementById("canvas");
if (!canvas) throw new Error("Canvas not found");
const drawer = new CanvasDrawer(canvas);

const framerate = 10;
const updatesPerDraw = 60;

let grid: Grid;

const createObjectCell = (potential: number, groupId = "g0"): Cell => {
	return { type: "object", potential, groupId, force: { x: 0, y: 0 } };
};

const generateSimpleGrid = () => {
	grid = new ZeroPadGrid(5, 5);
	grid = drawRectangularToGrid(grid, createObjectCell(100, "g1"), 1, 1, 1, 1);
	grid = drawRectangularToGrid(grid, createObjectCell(200, "g2"), 3, 3, 1, 1);
	grid = upscaleGrid(grid, 64);
	return grid;
};

const init = () => {
	grid = new ZeroPadGrid(16, 16);
	grid = drawRectangularToGrid(grid, createObjectCell(100, "g1"), 2, 2, 2, 2);
	grid = drawRectangularToGrid(grid, createObjectCell(200, "g2"), 8, 8, 2, 2);
	grid = drawRectangularToGrid(grid, createObjectCell(80, "g3"), 2, 8, 1, 2);
	grid = upscaleGrid(grid, 2);
	grid = generateSimpleGrid();
	console.log(grid);
};

const calculateForcesOnBodies = (grid: Grid) => {
	const bodies: Record<string, CellGroup> = {};
	forEveryCell(grid, (cell, _x, _y) => {
		if (cell.type !== "object") return;
		const groupId = cell.groupId;
		if (!bodies[groupId]) bodies[groupId] = { groupId, cellCount: 0, potential: 0, force: { x: 0, y: 0 }, cells: [] };
		bodies[groupId].cellCount += 1;
		bodies[groupId].potential += cell.potential;
		bodies[groupId].force.x += cell.force.x;
		bodies[groupId].force.y += cell.force.y;
		// bodies[groupId].cells.push(cell);
	});
	for (const groupId in bodies) {
		const count = bodies[groupId].cellCount;
		bodies[groupId].potential = bodies[groupId].potential / count;
		bodies[groupId].force.x = bodies[groupId].force.x / count;
		bodies[groupId].force.y = bodies[groupId].force.y / count;
	}
	return bodies;
};

const update = () => {
	for (let i = 0; i < updatesPerDraw; i++) {
		grid = updateGrid(grid);
	}

	// console.log(grid);
	// console.log(calculateForcesOnBodies(grid));
	console.time("draw");
	drawer.clear();
	drawer.draw(grid);
	console.timeEnd("draw");
	// drawer.drawForceField(grid);
};

init();
setInterval(() => update(), 1000 / framerate);
