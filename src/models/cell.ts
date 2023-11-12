import { Vector2 } from "./vector2";

export interface Cell {
	type: "object" | "space";
	potential: number;
	force?: Vector2;
}
