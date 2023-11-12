import { Cell } from "../models/cell";
import { Grid } from "../models/grid";

export const createEmptyGrid = (width: number, height: number): Grid => {
	const spaceCell: Cell = { type: "space", potential: 0 };
	return {
		width,
		height,
		cells: Array.from({ length: width }, () => Array.from({ length: height }, () => ({ ...spaceCell }))),
	};
};

export const drawRectangularToGrid = (grid: Grid, cell: Cell, x: number, y: number, width: number, height: number) => {
	for (let i = x; i < x + width; i++) {
		for (let j = y; j < y + height; j++) {
			grid.cells[i][j] = { ...cell };
		}
	}
	return grid;
};

export const upscaleGrid = (grid: Grid, scale: number): Grid => {
	const scaledGrid = createEmptyGrid(grid.width * scale, grid.height * scale);
	for (let x = 0; x < grid.width; x++) {
		for (let y = 0; y < grid.height; y++) {
			const cell = grid.cells[x][y];
			drawRectangularToGrid(scaledGrid, cell, x * scale, y * scale, scale, scale);
		}
	}
	return scaledGrid;
};
