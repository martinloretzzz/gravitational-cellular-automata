// From Dalimil/Vector2.js
// https://gist.github.com/Dalimil/3daf2a0c531d7d030deb37a7bfeff454

export class Vector2 {
	x: number;
	y: number;

	constructor(x: number = 0, y: number = 0) {
		this.x = x;
		this.y = y;
	}

	set(x: number, y: number) {
		this.x = x || 0;
		this.y = y || 0;
	}

	clone() {
		return new Vector2(this.x, this.y);
	}

	add(vector: Vector2) {
		return new Vector2(this.x + vector.x, this.y + vector.y);
	}

	subtract(vector: Vector2) {
		return new Vector2(this.x - vector.x, this.y - vector.y);
	}

	scale(scalar: number) {
		return new Vector2(this.x * scalar, this.y * scalar);
	}

	dot(vector: Vector2) {
		return this.x * vector.x + this.y * vector.y;
	}

	moveTowards(vector: Vector2, t: number) {
		t = Math.min(t, 1);
		const diff = vector.subtract(this);
		return this.add(diff.scale(t));
	}

	magnitude() {
		return Math.sqrt(this.magnitudeSqr());
	}

	magnitudeSqr() {
		return this.x * this.x + this.y * this.y;
	}

	distance(vector: Vector2) {
		return Math.sqrt(this.distanceSqr(vector));
	}

	distanceSqr(vector: Vector2) {
		const deltaX = this.x - vector.x;
		const deltaY = this.y - vector.y;
		return deltaX * deltaX + deltaY * deltaY;
	}

	normalize() {
		const mag = this.magnitude();
		const vector = this.clone();
		if (Math.abs(mag) < 1e-9) {
			vector.x = 0;
			vector.y = 0;
		} else {
			vector.x /= mag;
			vector.y /= mag;
		}
		return vector;
	}

	angle() {
		return Math.atan2(this.y, this.x);
	}

	rotate(alpha: number) {
		const cos = Math.cos(alpha);
		const sin = Math.sin(alpha);
		const vector = new Vector2();
		vector.x = this.x * cos - this.y * sin;
		vector.y = this.x * sin + this.y * cos;
		return vector;
	}

	toPrecision(precision: number) {
		const vector = this.clone();
		vector.x = parseFloat(vector.x.toFixed(precision));
		vector.y = parseFloat(vector.y.toFixed(precision));
		return vector;
	}

	toString() {
		const vector = this.toPrecision(1);
		return `[${vector.x}; ${vector.y}]`;
	}
}
