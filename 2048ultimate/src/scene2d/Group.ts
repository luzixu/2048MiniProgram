/**
 * Created By Lu Yao
 * 
 * 2018-04-01
 */

class Group extends Actor {

	private children : Array<Actor> = new Array<Actor>();

	private container : egret.DisplayObjectContainer;

	public constructor()
	{
		super();
		this.container = new egret.DisplayObjectContainer();
		this.view = this.container;
	}

	public act ( delta) {
		super.act(delta);	
		for (let i = 0, n = this.children.length; i < n; i++)
			this.children[i].act(delta);
	}

	protected childrenChanged()
	{

	}

	public addChild(actor : Actor) {
		this.addChildView(actor);
		this.children.push(actor);
		actor.setParent(this);
		this.childrenChanged();
	}

	public childrenSize(){
		return this.children.length;
	}

	public addChildAt(index : number,actor : Actor) {
		if(index > this.children.length) {
			this.children.push(actor);
		} else {
			this.children.splice(index, 0,actor);
		}
		this.addChildView(actor);
		actor.setParent(this);
		this.childrenChanged();
	}

	public removeChild(actor : Actor) {
		let index = this.children.indexOf(actor);
        if (index != -1) {
            this.children.splice(index, 1);
        }
		this.removeChildView(actor);
		actor.setParent(null);
		this.childrenChanged();
	}

	private addChildView(actor : Actor) {
		if(actor.view != null) {
			this.container.addChild(actor.view);
		}
	}

	private removeChildView(actor : Actor) {
		if(actor.view != null) {
			this.container.removeChild(actor.view);
		}
	}
}