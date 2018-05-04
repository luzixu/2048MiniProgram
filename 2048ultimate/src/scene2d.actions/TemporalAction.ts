abstract class TemporalAction extends Action {
	private duration: number;
	private time: number;
	private interpolation: Interpolation;
	private reverse: boolean;
	private began: boolean;
	private complete: boolean;

	public act(delta: number): boolean {
		if (this.complete) return true;
		let pool = this.getPool();
		this.setPool(null); // Ensure this action can't be returned to the pool while executing.
		try {
			if (!this.began) {
				this.begin();
				this.began = true;
			}
			this.time += delta;
			this.complete = this.time >= this.duration;
			let percent = 0;
			if (this.complete)
				percent = 1;
			else {
				percent = this.time / this.duration;
				if (this.interpolation != null) {
					percent = this.interpolation.applysimple(percent);
				}
			}
			this.update(this.reverse ? 1 - percent : percent);
			if (this.complete) this.end();
			return this.complete;
		} finally {
			this.setPool(pool);
		}
	}

	protected begin() {
	}

	protected end() {
	}

	protected abstract update(percent: number);

	public finish() {
		this.time = this.duration;
	}

	public restart() {
		this.time = 0;
		this.began = false;
		this.complete = false;
	}

	public reset() {
		super.reset();
		this.reverse = false;
		this.interpolation = null;
	}

	public getTime() {
		return this.time;
	}

	public setTime(time) {
		this.time = time;
	}

	public getDuration() {
		return this.duration;
	}

	public setDuration(duration: number) {
		this.duration = duration;
	}

	public getInterpolation(): Interpolation {
		return this.interpolation;
	}

	public setInterpolation(interpolation: Interpolation) {
		this.interpolation = interpolation;
	}

	public isReverse(): boolean {
		return this.reverse;
	}

	public setReverse(reverse: boolean) {
		this.reverse = reverse;
	}
}