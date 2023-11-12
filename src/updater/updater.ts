import { Grid } from "../models/grid";

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
	const kernelScaler = 1 / (5 + 4 * edgeScaler);
	const kernel = getKernel(grid, x, y, edgeScaler);

	const [top, vmiddle, bottom] = kernel.map((_, i) => kernel[i][0] + kernel[i][1] + kernel[i][2]);
	const [left, hmiddle, right] = kernel.map((_, i) => kernel[0][i] + kernel[1][i] + kernel[2][i]);

	const forceX = kernelScaler * (vmiddle + top - bottom);
	const forceY = kernelScaler * (hmiddle + left - right);
	return { x: forceX, y: forceY };
};

const getCellPotential = (grid: Grid, x: number, y: number): number => {
	const edgeScaler = 1 / Math.sqrt(2);
	const kernel = getKernel(grid, x, y, edgeScaler);
	const sumPotential = kernel.flat().reduce((a, b) => a + b, 0);
	return sumPotential / (5 + 4 * edgeScaler);
};

const updateGridGravitationalPotential = (grid: Grid): Grid => {
	const updatedGrid = { ...grid };
	for (let x = 0; x < grid.width; x++) {
		for (let y = 0; y < grid.height; y++) {
			const cell = grid.cells[x][y];
			if (cell.type !== "object") {
				updatedGrid.cells[x][y] = { ...cell };
				updatedGrid.cells[x][y].potential = getCellPotential(grid, x, y);
				updatedGrid.cells[x][y].force = getCellForceVector(grid, x, y);
			}
		}
	}
	return updatedGrid;
};

export const updateGrid = (grid: Grid): Grid => {
	return updateGridGravitationalPotential(grid);
};
