/**
 * Created By Lu Yao
 * 
 * 2018-04-01
 */

abstract class CommonPool<T extends Poolable> {

	private max : number = 16;

	public peak : number;

	private freeObjects : Array<T>;

	public constructor (max : number) {
		this.freeObjects = new Array<T>(max);
		
	}

	public abstract newObject() : T;

	public obtain() : T {
		return this.freeObjects.length == 0 ? this.newObject() : this.freeObjects.pop();
	}

	public free (obj : T) {
		if (obj == null) throw new Error("free object is null");
		if (this.freeObjects.length < this.max) {
			this.freeObjects.push(obj);
			this.peak = Math.max(this.peak, this.freeObjects.length);
		}
		if (obj instanceof Poolable) 
		{
			obj.reset();
		}
	}

	public freeAll (objects : Array<T>) {
		if (objects == null) throw new Error("free object is null");
		for (let i = 0; i < objects.length; i++) {
			let object = objects[i];
			if (object == null) continue;
			if (this.freeObjects.length < this.max) this.freeObjects.push(object);
			if (object instanceof Poolable) {
				object.reset();
			}
		}
		this.peak = Math.max(this.peak, this.freeObjects.length);
	}

	public clear () {
		this.freeObjects.length = 0;
	}

	public getFree () :number {
		return this.freeObjects.length;
	}
}
