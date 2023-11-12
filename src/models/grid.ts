import { Cell } from "./cell";

export interface Grid {
	width: number;
	height: number;
	cells: Cell[][];
}
