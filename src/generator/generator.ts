import { Cell } from "../models/cell";
import { Grid, ZeroPadGrid } from "../models/grid";

export const drawRectangularToGrid = (grid: Grid, cell: Cell, x: number, y: number, width: number, height: number) => {
	for (let i = x; i < x + width; i++) {
		for (let j = y; j < y + height; j++) {
			grid.setCell(i, j, { ...cell });
		}
	}
	return grid;
};

export const upscaleGrid = (grid: Grid, scale: number): Grid => {
	const scaledGrid = new ZeroPadGrid(grid.width * scale, grid.height * scale);
	for (let x = 0; x < grid.width; x++) {
		for (let y = 0; y < grid.height; y++) {
			const cell = grid.getCell(x, y);
			drawRectangularToGrid(scaledGrid, cell, x * scale, y * scale, scale, scale);
		}
	}
	return scaledGrid;
};
