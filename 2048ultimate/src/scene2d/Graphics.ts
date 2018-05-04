/**
 * Created By Lu Yao
 * 
 * 2018-04-01
 */

class Graphics {

	private lastFrameTime : number = egret.getTimer();

	private deltaTime : number = 0;

	private frameStart : number= egret.getTimer();

	private frames : number = 0;

	private fps : number = 0;

	public constructor() {
	}

	public onUpdate(){
		let now = egret.getTimer();
		this.deltaTime = (now - this.lastFrameTime) / 1000.0;
		this.lastFrameTime = now;
		if (now - this.frameStart > 1000) {
			this.fps = this.frames;
			this.frames = 0;
			this.frameStart = now;
		}
		this.frames++;
	}

	public getDeltaTime()
	{
		return this.deltaTime;
	}

	private static instance:Graphics;

    public static getInstance():Graphics {
        if (Graphics.instance == null) {
            Graphics.instance = new Graphics();
        }
        return Graphics.instance;
    }
}