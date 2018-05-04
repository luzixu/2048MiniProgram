class MathUtils {

	public static  clamp ( value: number,  min: number,  max: number) : number{
		if (value < min) return min;
		if (value > max) return max;
		return value;
	}

	public static randomInt(start:number,end:number):number {
		let numberLen = Math.abs(end - start);
		return Math.floor(start + numberLen * Math.random());
	}

	public static randomBoolean() {
		let v = Math.random();
		if(v >= 0.5) {
			return true;
		}
		return false;
	}
}