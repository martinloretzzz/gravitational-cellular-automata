import { Grid } from "../models/grid";

const zeroIfOutOfBounds = (grid: Grid, x: number, y: number): number => {
	if (x < 0 || y < 0 || x >= grid.width || y >= grid.height) return 0;
	return grid.cells[x][y].potential;
};

const potentialFromNeighbours = (grid: Grid, x: number, y: number): number => {
	const cell = (x: number, y: number) => zeroIfOutOfBounds(grid, x, y);
	const top = cell(x - 1, y - 1) + cell(x, y - 1) + cell(x + 1, y - 1);
	const middle = cell(x - 1, y) + cell(x, y) + cell(x + 1, y);
	const bottom = cell(x - 1, y + 1) + cell(x, y + 1) + cell(x + 1, y + 1);
	return (top + middle + bottom) / 9;
};

const updateGridGravitationalPotential = (grid: Grid): Grid => {
	const updatedGrid = { ...grid };
	for (let x = 0; x < grid.width; x++) {
		for (let y = 0; y < grid.height; y++) {
			const cell = grid.cells[x][y];
			if (cell.type !== "object") {
				updatedGrid.cells[x][y] = { ...cell };
				updatedGrid.cells[x][y].potential = potentialFromNeighbours(grid, x, y);
			}
		}
	}
	return updatedGrid;
};

export const updateGrid = (grid: Grid): Grid => {
	return updateGridGravitationalPotential(grid);
};
