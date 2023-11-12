import { Grid } from "../models/grid";

export class CanvasDrawer {
	private canvas: HTMLCanvasElement;
	private ctx: CanvasRenderingContext2D;

	constructor(canvas: HTMLCanvasElement) {
		this.canvas = canvas;
		const ctx = canvas.getContext("2d");
		if (!ctx) throw new Error("Canvas context not found");
		this.ctx = ctx;
	}

	private getDimensions(): { width: number; height: number } {
		return this.canvas.getBoundingClientRect();
	}

	public clear() {
		const { width, height } = this.getDimensions();
		this.ctx.clearRect(0, 0, width, height);
	}

	public draw(grid: Grid) {
		const { width, height } = this.getDimensions();
		for (let x = 0; x < grid.width; x++) {
			for (let y = 0; y < grid.height; y++) {
				const cell = grid.cells[x][y];
				const color = cell.type === "object" ? `rgb(${cell.potential}, 0, 0)` : `rgb(0, ${cell.potential}, 0)`;
				this.ctx.fillStyle = color;
				this.ctx.fillRect(
					(x * width) / grid.width,
					(y * height) / grid.height,
					width / grid.width,
					height / grid.height
				);
			}
		}
	}
}
