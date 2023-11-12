import { Grid, ZeroPadGrid } from "../models/grid";
import { forEveryCell } from "../util/util";

const getCellForceVector = (grid: Grid, x: number, y: number): { x: number; y: number } => {
	const edgeScaler = 1 / Math.sqrt(2);
	const cell = (x: number, y: number) => grid.getCell(x, y).potential;

	const top = edgeScaler * cell(x - 1, y - 1) + cell(x, y - 1) + edgeScaler * cell(x + 1, y - 1);
	const bottom = edgeScaler * cell(x - 1, y + 1) + cell(x, y + 1) + edgeScaler * cell(x + 1, y + 1);

	const left = edgeScaler * cell(x - 1, y - 1) + cell(x - 1, y) + edgeScaler * cell(x - 1, y + 1);
	const right = edgeScaler * cell(x + 1, y - 1) + cell(x + 1, y) + edgeScaler * cell(x + 1, y + 1);

	const kernelScaler = 1 / (2 + 4 * edgeScaler);
	const forceX = kernelScaler * (left - right);
	const forceY = kernelScaler * (top - bottom);
	return { x: forceX, y: forceY };
};

const getCellPotential = (grid: Grid, x: number, y: number): number => {
	const edgeScaler = 1 / Math.sqrt(2);
	const cell = (x: number, y: number) => grid.getCell(x, y).potential;

	const potential =
		edgeScaler * cell(x - 1, y - 1) +
		cell(x, y - 1) +
		edgeScaler * cell(x + 1, y - 1) +
		cell(x - 1, y) +
		cell(x, y) +
		cell(x + 1, y) +
		edgeScaler * cell(x - 1, y + 1) +
		cell(x, y + 1) +
		edgeScaler * cell(x + 1, y + 1);

	return potential / (5 + 4 * edgeScaler);
};

export const updateGrid = (grid: Grid): Grid => {
	console.time("copy");
	const updatedGrid: Grid = new ZeroPadGrid(grid.width, grid.height);
	console.timeEnd("copy");
	console.time("updatePotential");
	forEveryCell(grid, (cell, x, y) => {
		if (cell.type === "object") {
			updatedGrid.setCell(x, y, cell);
			return;
		}
		updatedGrid.getCell(x, y).potential = getCellPotential(grid, x, y);
	});
	console.timeEnd("updatePotential");
	console.time("updateForce");
	forEveryCell(grid, (_cell, x, y) => {
		updatedGrid.getCell(x, y).force = getCellForceVector(updatedGrid, x, y);
	});
	console.timeEnd("updateForce");
	return updatedGrid;
};

// Performance 320x230 Grid:
// - no optimization: 100ms/35ms
// - ZeroPadGrid: 84ms/28ms
// - directly access grid, no getKernel: 4ms/6ms
