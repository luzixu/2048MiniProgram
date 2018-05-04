/**
 * Created By Lu Yao
 * 
 * 2018-04-01
 */

class Scene extends egret.DisplayObjectContainer {

	public root : Group = new Group();

	public constructor()
	{
		super();
		this.addChild(this.root.view);
	}

	public getRoot() {
		return this.root;
	}

	public addActor(actor : Actor) {
		this.root.addChild(actor);
		console.log("scene actor length:" + this.root.childrenSize());
	}

	public onEnter()
	{
		
	}

	public onStart()
	{
		this.root.setPosition(0,0);
		this.root.setSize(DisplayData.StageWidth,DisplayData.StageHeight);
	}

	public onUpdate()
	{
		let deltaTime = Graphics.getInstance().getDeltaTime();
		this.root.act(deltaTime);
	}

	public onExit()
	{

	}

	public onPause()
	{

	}

	public onResume()
	{

	}
}