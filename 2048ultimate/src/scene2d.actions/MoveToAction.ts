class MoveToAction extends TemporalAction {

	private startX: number;
	private startY: number;
	private endX: number;
	private endY: number;

	protected begin() {
		this.startX = this.actor.getX();
		this.startY = this.actor.getY();
	}

	protected update(percent: number) {
		this.actor.setPosition(this.startX + (this.endX - this.startX) * percent, this.startY + (this.endY - this.startY) * percent);
	}

	public setPosition(x, y) {
		this.endX = x;
		this.endY = y;
	}

	public getX() {
		return this.endX;
	}

	public setX(x) {
		this.endX = x;
	}

	public getY() {
		return this.endY;
	}

	public setY(y) {
		this.endY = y;
	}
}