import { Cell } from "./cell";

export interface Grid {
	width: number;
	height: number;
	getCell: (x: number, y: number) => Cell;
	setCell: (x: number, y: number, cell: Cell) => void;
}

export class ZeroPadGrid {
	private cells: Cell[][] = [];

	constructor(public width: number, public height: number, initialCell: Cell | undefined = undefined) {
		const cell = initialCell || ({ type: "space", potential: 0 } as Cell);
		for (let x = 0; x < width + 2; x++) {
			this.cells[x] = [];
			for (let y = 0; y < height + 2; y++) {
				this.cells[x][y] = { ...cell };
			}
		}
	}

	getCell(x: number, y: number): Cell {
		return this.cells[x + 1][y + 1];
	}

	setCell(x: number, y: number, cell: Cell): void {
		this.cells[x + 1][y + 1] = cell;
	}
}
