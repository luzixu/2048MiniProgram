

abstract class Interpolation {

	public applysimple (a : number) : number
	 {
		 return a;
	 }

	public apply ( start: number,  end: number,  a: number) : number{
		return start + (end - start) * this.applysimple(a);
	}

	
	// public static  linear : Interpolation = new SimpleInterpolation();

	// public static  fade : Interpolation = new FadeInterpolation();

}
	// static public final Pow pow2 = new Pow(2);
	// static public final PowIn pow2In = new PowIn(2);
	// static public final PowOut pow2Out = new PowOut(2);

	// static public final Pow pow3 = new Pow(3);
	// static public final PowIn pow3In = new PowIn(3);
	// static public final PowOut pow3Out = new PowOut(3);

	// static public final Pow pow4 = new Pow(4);
	// static public final PowIn pow4In = new PowIn(4);
	// static public final PowOut pow4Out = new PowOut(4);

	// static public final Pow pow5 = new Pow(5);
	// static public final PowIn pow5In = new PowIn(5);
	// static public final PowOut pow5Out = new PowOut(5);

	// static public final Interpolation sine = new Interpolation() {
	// 	public float apply (float a) {
	// 		return (1 - MathUtils.cos(a * MathUtils.PI)) / 2;
	// 	}
	// };

	// static public final Interpolation sineIn = new Interpolation() {
	// 	public float apply (float a) {
	// 		return 1 - MathUtils.cos(a * MathUtils.PI / 2);
	// 	}
	// };

	// static public final Interpolation sineOut = new Interpolation() {
	// 	public float apply (float a) {
	// 		return MathUtils.sin(a * MathUtils.PI / 2);
	// 	}
	// };

	// static public final Interpolation exp10 = new Exp(2, 10);
	// static public final Interpolation exp10In = new ExpIn(2, 10);
	// static public final Interpolation exp10Out = new ExpOut(2, 10);

	// static public final Interpolation exp5 = new Exp(2, 5);
	// static public final Interpolation exp5In = new ExpIn(2, 5);
	// static public final Interpolation exp5Out = new ExpOut(2, 5);

	// static public final Interpolation circle = new Interpolation() {
	// 	public float apply (float a) {
	// 		if (a <= 0.5f) {
	// 			a *= 2;
	// 			return (1 - (float)Math.sqrt(1 - a * a)) / 2;
	// 		}
	// 		a--;
	// 		a *= 2;
	// 		return ((float)Math.sqrt(1 - a * a) + 1) / 2;
	// 	}
	// };

	// static public final Interpolation circleIn = new Interpolation() {
	// 	public float apply (float a) {
	// 		return 1 - (float)Math.sqrt(1 - a * a);
	// 	}
	// };

	// static public final Interpolation circleOut = new Interpolation() {
	// 	public float apply (float a) {
	// 		a--;
	// 		return (float)Math.sqrt(1 - a * a);
	// 	}
	// };

	// static public final Elastic elastic = new Elastic(2, 10);
	// static public final Elastic elasticIn = new ElasticIn(2, 10);
	// static public final Elastic elasticOut = new ElasticOut(2, 10);

	// static public final Interpolation swing = new Swing(1.5f);
	// static public final Interpolation swingIn = new SwingIn(2f);
	// static public final Interpolation swingOut = new SwingOut(2f);

	// static public final Interpolation bounce = new Bounce(4);
	// static public final Interpolation bounceIn = new BounceIn(4);
	// static public final Interpolation bounceOut = new BounceOut(4);

	// //

	// static public class Pow extends Interpolation {
	// 	final int power;

	// 	public Pow (int power) {
	// 		this.power = power;
	// 	}

	// 	public float apply (float a) {
	// 		if (a <= 0.5f) return (float)Math.pow(a * 2, power) / 2;
	// 		return (float)Math.pow((a - 1) * 2, power) / (power % 2 == 0 ? -2 : 2) + 1;
	// 	}
	// }

	// static public class PowIn extends Pow {
	// 	public PowIn (int power) {
	// 		super(power);
	// 	}

	// 	public float apply (float a) {
	// 		return (float)Math.pow(a, power);
	// 	}
	// }

	// static public class PowOut extends Pow {
	// 	public PowOut (int power) {
	// 		super(power);
	// 	}

	// 	public float apply (float a) {
	// 		return (float)Math.pow(a - 1, power) * (power % 2 == 0 ? -1 : 1) + 1;
	// 	}
	// }

	// //

	// static public class Exp extends Interpolation {
	// 	final float value, power, min, scale;

	// 	public Exp (float value, float power) {
	// 		this.value = value;
	// 		this.power = power;
	// 		min = (float)Math.pow(value, -power);
	// 		scale = 1 / (1 - min);
	// 	}

	// 	public float apply (float a) {
	// 		if (a <= 0.5f) return ((float)Math.pow(value, power * (a * 2 - 1)) - min) * scale / 2;
	// 		return (2 - ((float)Math.pow(value, -power * (a * 2 - 1)) - min) * scale) / 2;
	// 	}
	// };

	// static public class ExpIn extends Exp {
	// 	public ExpIn (float value, float power) {
	// 		super(value, power);
	// 	}

	// 	public float apply (float a) {
	// 		return ((float)Math.pow(value, power * (a - 1)) - min) * scale;
	// 	}
	// }

	// static public class ExpOut extends Exp {
	// 	public ExpOut (float value, float power) {
	// 		super(value, power);
	// 	}

	// 	public float apply (float a) {
	// 		return 1 - ((float)Math.pow(value, -power * a) - min) * scale;
	// 	}
	// }

// static public class Elastic extends Interpolation {
// 		final float value, power;

// 		public Elastic (float value, float power) {
// 			this.value = value;
// 			this.power = power;
// 		}

// 		public float apply (float a) {
// 			if (a <= 0.5f) {
// 				a *= 2;
// 				return (float)Math.pow(value, power * (a - 1)) * MathUtils.sin(a * 20) * 1.0955f / 2;
// 			}
// 			a = 1 - a;
// 			a *= 2;
// 			return 1 - (float)Math.pow(value, power * (a - 1)) * MathUtils.sin((a) * 20) * 1.0955f / 2;
// 		}
// 	}

// 	static public class ElasticIn extends Elastic {
// 		public ElasticIn (float value, float power) {
// 			super(value, power);
// 		}

// 		public float apply (float a) {
// 			return (float)Math.pow(value, power * (a - 1)) * MathUtils.sin(a * 20) * 1.0955f;
// 		}
// 	}

// 	static public class ElasticOut extends Elastic {
// 		public ElasticOut ( value:number,  power:number) {
// 			super(value, power);
// 		}

// 		public  apply ( a:number) {
// 			a = 1 - a;
			
// 			return (1 - (float)Math.pow(value, power * (a - 1)) * MathUtils.sin(a * 20) * 1.0955f);
// 		}
// 	}


// 	 public static class Bounce extends BounceOut {
// 		public Bounce (widths : number[], heights: number[]) {
// 			super(widths, heights);
// 		}

// 		public Bounce ( bounces : number) {
// 			super(bounces);
// 		}

// 		private  out ( a : number) : number {
// 			let test = a + widths[0] / 2;
// 			if (test < widths[0]) return test / (widths[0] / 2) - 1;
// 			return super.apply(a);
// 		}

// 		public  apply ( a : number) : number {
// 			if (a <= 0.5) return (1 - out(1 - a * 2)) / 2;
// 			return out(a * 2 - 1) / 2 + 0.5;
// 		}
// 	}

// 	 public static class BounceOut extends Interpolation {
// 		 widths:number[];
// 		 heights : number[];

// 		public BounceOut (widths:number[], heights:number[]) {
// 			if (widths.length != heights.length)
// 				throw new IllegalArgumentException("Must be the same number of widths and heights.");
// 			this.widths = widths;
// 			this.heights = heights;
// 		}

// 		public BounceOut ( bounces:number) {
// 			if (bounces < 2 || bounces > 5) throw new IllegalArgumentException("bounces cannot be < 2 or > 5: " + bounces);
// 			this.widths = new number[bounces];
// 			this.heights = new number[bounces];
// 			this.heights[0] = 1;
// 			switch (bounces) {
// 			case 2:
// 				this.widths[0] = 0.6;
// 				this.widths[1] = 0.4;
// 				this.heights[1] = 0.33;
// 				break;
// 			case 3:
// 				this.widths[0] = 0.4;
// 				this.widths[1] = 0.4;
// 				this.widths[2] = 0.2;
// 				this.heights[1] = 0.33;
// 				this.heights[2] = 0.1;
// 				break;
// 			case 4:
// 				this.widths[0] = 0.34;
// 				this.widths[1] = 0.34;
// 				this.widths[2] = 0.2;
// 				this.widths[3] = 0.15;
// 				this.heights[1] = 0.26;
// 				this.heights[2] = 0.11;
// 				this.heights[3] = 0.03;
// 				break;
// 			case 5:
// 				this.widths[0] = 0.3;
// 				this.widths[1] = 0.3;
// 				this.widths[2] = 0.2;
// 				this.widths[3] = 0.1;
// 				this.widths[4] = 0.1;
// 				this.heights[1] = 0.45;
// 				this.heights[2] = 0.3;
// 				this.heights[3] = 0.15;
// 				this.heights[4] = 0.06;
// 				break;
// 			}
// 			widths[0] *= 2;
// 		}

// 		public apply ( a : number) : number {
// 			a += this.widths[0] / 2;
// 			let width = 0, height = 0;
// 			for (let i = 0, n = widths.length; i < n; i++) {
// 				width = this.widths[i];
// 				if (a <= width) {
// 					height = this.heights[i];
// 					break;
// 				}
// 				a -= width;
// 			}
// 			a /= width;
// 			let z = 4 / width * height * a;
// 			return 1 - (z - z * a) * width;
// 		}
// 	}

//  public static class BounceIn extends BounceOut {
// 		public BounceIn (widths : number[] , heights :number[] ) {
// 			super(widths, heights);
// 		}

// 		public BounceIn (bounces : number) {
// 			super(bounces);
// 		}

// 		public apply(a : number) : number {
// 			return 1 - super.apply(1 - a);
// 		}
// 	}

// 	 public static  class Swing extends Interpolation {
// 		private  scale : number;

// 		public Swing ( scale:number)  {
// 			this.scale = scale * 2;
// 		}

// 		public  apply ( a:number):number {
// 			if (a <= 0.5) {
// 				a *= 2;
// 				return a * a * ((scale + 1) * a - scale) / 2;
// 			}
// 			a--;
// 			a *= 2;
// 			return a * a * ((scale + 1) * a + scale) / 2 + 1;
// 		}
// 	}


//  public static class SwingOut extends Interpolation {
// 		private scale : number;

// 		public SwingOut ( scale: number) {
// 			this.scale = scale;
// 		}

// 		public apply (a: number) {
// 			a--;
// 			return a * a * ((scale + 1) * a + scale) + 1;
// 		}
// 	}


//  public static class SwingIn extends Interpolation {
// 		private  scale: number;

// 		public SwingIn ( scale: number) {
// 			this.scale = scale;
// 		}

// 		public  apply ( a: number) {
// 			return a * a * ((scale + 1) * a - scale);
// 		}
// 	}


// public static class SimpleInterpolation extends Interpolation {
// 		public apply  (a : number) : number {
// 			return a;
// 		}
// }

// public static class FadeInterpolation extends Interpolation {
// 		public apply  (a : number) : number {
// 			return MathUtils.clamp(a * a * a * (a * (a * 6 - 15) + 10), 0, 1);
// 		}
// }