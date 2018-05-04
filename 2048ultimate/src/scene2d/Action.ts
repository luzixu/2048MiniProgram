/**
 * Created By Lu Yao
 * 
 * 2018-04-01
 */

abstract class Action extends GameObject{

	protected actor : Actor;

	private pool : ObjectPool;

	public abstract  act (delta :number) : boolean;

	public restart () {
	}

	public getActor () : Actor{
		return this.actor;
	}

	public setActor (actor : Actor) {
		this.actor = actor;
		if (actor == null) {
			if (this.pool != null) {
				this.pool.destroyObject(actor);
				this.pool = null;
			}
		}
	}

	public reset () {
		this.restart();
	}

	public getPool () : ObjectPool{
		return this.pool;
	}

	public setPool (pool : ObjectPool) {
		this.pool = pool;
	}
}