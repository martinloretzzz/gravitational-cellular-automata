export type Cell = ObjectCell | SpaceCell;

export interface ObjectCell {
	type: "object";
	potential: number;
	force: { x: number; y: number };
	groupId: string;
}

export interface SpaceCell {
	type: "space";
	potential: number;
	force: { x: number; y: number };
}
