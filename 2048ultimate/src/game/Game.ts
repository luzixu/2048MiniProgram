class Game {

	private _currentScene : Scene;

	private _preScene : Scene;

	private _main : Main;

	public init()
	{
		this.onCreate();
	}

	public onUpdate()
	{
		Graphics.getInstance().onUpdate();
		this._currentScene.onUpdate();
	}

	public onPause()
	{

	}

	public onResume()
	{

	}

	public setMain(main : Main) {
		this._main = main;
	}

	public switchGameScene(scene : Scene)
	{
		this._preScene = this._currentScene;
		this._currentScene = scene;
		if(this._preScene != null) {
			this._preScene.onExit();
			this._main.removeChild(this._preScene);
		}
		if(this._currentScene != null) {
			this._currentScene.onEnter();
			this._main.addChild(this._currentScene);
			this._currentScene.x = 0;
			this._currentScene.y = 0;
		}
	}

	private onCreate()
	{
		let scene = new GameScene();
		this.switchGameScene(scene);
		DisplayData.StageWidth = scene.stage.stageWidth;
		DisplayData.StageHeight = scene.stage.stageHeight;
		console.log("DisplayData.StageWidth-->" + DisplayData.StageWidth);
		console.log("DisplayData.stageHeight-->" + DisplayData.StageHeight);
		scene.onStart();
	}

	private static INSTANCE :Game;

	public static getInstance() : Game
	{
		if(Game.INSTANCE == null) {
			Game.INSTANCE = new Game();
		}
		return Game.INSTANCE;
	}
}