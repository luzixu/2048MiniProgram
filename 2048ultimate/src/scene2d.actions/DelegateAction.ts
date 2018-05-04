abstract class DelegateAction extends Action {

	protected action : Action;

	public setAction(action : Action) {
		this.action = action;
	}

	public  getAction() : Action{
		return this.action;
	}

	protected abstract delegate(delta : number) : boolean;

	public act(delta:number) : boolean {
		let pool = this.getPool();
		this.setPool(null);
		try {
			return this.delegate(delta);
		} catch (error) {
			
		} finally {
			this.setPool(null);
		}
	}

	public restart(){
		if(this.action != null) {
			this.action.restart();
		}
	}

	public reset() {
		super.reset();
		this.action = null;
	}

	public setActor(actor : Actor) {
		if(this.action != null) {
			this.action.setActor(actor);
		}
		super.setActor(actor);
	}

}