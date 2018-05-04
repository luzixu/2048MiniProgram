class DelayAction extends DelegateAction {

	private duration: number;

	private time: number;

	protected delegate(delta: number): boolean {
		if (this.time < this.duration) {
			this.time += delta;
			if (this.time < this.duration) return false;
			delta = this.time - this.duration;
		}
		if (this.action == null) return true;
		return this.action.act(delta);
	}

	public finish() {
		this.time = this.duration;
	}

	public restart() {
		super.restart();
		this.time = 0;
	}

	public getTime() {
		return this.time;
	}

	public setTime(time: number) {
		this.time = time;
	}

	public getDuration() {
		return this.duration;
	}

	public setDuration(duration: number) {
		this.duration = duration;
	}
}