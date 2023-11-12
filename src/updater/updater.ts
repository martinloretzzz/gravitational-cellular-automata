import { Cell } from "../models/cell";
import { Grid } from "../models/grid";
import { forEveryCell } from "../util/util";

const zeroIfOutOfBounds = (grid: Grid, x: number, y: number): number => {
	if (x < 0 || y < 0 || x >= grid.width || y >= grid.height) return 0;
	return grid.cells[x][y].potential;
};

const getKernel = (grid: Grid, x: number, y: number, edgeScaler = 1 / Math.sqrt(2)): number[][] => {
	const cell = (x: number, y: number) => zeroIfOutOfBounds(grid, x, y);
	return [
		[edgeScaler * cell(x - 1, y - 1), cell(x, y - 1), edgeScaler * cell(x + 1, y - 1)],
		[cell(x - 1, y), cell(x, y), cell(x + 1, y)],
		[edgeScaler * cell(x - 1, y + 1), cell(x, y + 1), edgeScaler * cell(x + 1, y + 1)],
	];
};

const getCellForceVector = (grid: Grid, x: number, y: number): { x: number; y: number } => {
	const edgeScaler = 1 / Math.sqrt(2);
	const kernel = getKernel(grid, x, y, edgeScaler);

	const [top, _vmiddle, bottom] = kernel.map((_, i) => kernel[i][0] + kernel[i][1] + kernel[i][2]);
	const [left, _hmiddle, right] = kernel.map((_, i) => kernel[0][i] + kernel[1][i] + kernel[2][i]);

	const kernelScaler = 1 / (2 + 4 * edgeScaler);
	const forceX = kernelScaler * (left - right);
	const forceY = kernelScaler * (top - bottom);
	return { x: forceX, y: forceY };
};

const getCellPotential = (grid: Grid, x: number, y: number): number => {
	const edgeScaler = 1 / Math.sqrt(2);
	const kernel = getKernel(grid, x, y, edgeScaler);
	const sumPotential = kernel.flat().reduce((a, b) => a + b, 0);
	return sumPotential / (5 + 4 * edgeScaler);
};

export const updateGrid = (grid: Grid): Grid => {
	const updatedGrid: Grid = {
		...grid,
		cells: Array.from({ length: grid.width }, () => Array.from({ length: grid.height }, () => ({} as Cell))),
	};
	forEveryCell(grid, (cell, x, y) => {
		if (cell.type === "object") {
			updatedGrid.cells[x][y] = { ...cell };
			return;
		}
		updatedGrid.cells[x][y] = { type: "space", potential: getCellPotential(grid, x, y), force: { x: 0, y: 0 } };
	});
	forEveryCell(grid, (_cell, x, y) => {
		updatedGrid.cells[x][y].force = getCellForceVector(updatedGrid, x, y);
	});
	return updatedGrid;
};
