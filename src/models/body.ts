import { ObjectCell } from "./cell";

export interface ObjectCellGroup {
	groupId: string;
	cellCount: number;
	potential: number;
	force: { x: number; y: number };
	cells: ObjectCell[];
}
