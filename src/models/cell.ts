export interface Cell {
	type: "object" | "space";
	potential: number;
	force?: { x: number; y: number };
}
