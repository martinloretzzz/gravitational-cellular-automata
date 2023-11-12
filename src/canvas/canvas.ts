import { Grid } from "../models/grid";
import { forEveryCell } from "../util/util";

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
		forEveryCell(grid, (cell, x, y) => {
			const color = cell.type === "object" ? `rgb(${cell.potential}, 0, 0)` : `rgb(0, ${cell.potential}, 0)`;
			this.ctx.fillStyle = color;
			this.ctx.fillRect((x * width) / grid.width, (y * height) / grid.height, width / grid.width, height / grid.height);
		});
	}

	public drawForceField(grid: Grid) {
		const { width, height } = this.getDimensions();
		forEveryCell(grid, (cell, x, y) => {
			if (!cell.force) return;
			const color = `rgb(0, 255, 255)`;
			const startX = width * ((x + 0.5) / grid.width);
			const startY = height * ((y + 0.5) / grid.height);
			this.ctx.beginPath();
			this.ctx.moveTo(startX, startY);
			this.ctx.lineTo(startX - cell.force.x, startY - cell.force.y);
			this.ctx.strokeStyle = color;
			this.ctx.stroke();
		});
	}
}
