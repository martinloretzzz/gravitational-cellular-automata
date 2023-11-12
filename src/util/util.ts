import { Cell } from "../models/cell";
import { Grid } from "../models/grid";

export const forEveryCell = (grid: Grid, callback: (cell: Cell, x: number, y: number) => void) => {
	for (let x = 0; x < grid.width; x++) {
		for (let y = 0; y < grid.height; y++) {
			const cell = grid.cells[x][y];
			callback(cell, x, y);
		}
	}
};
