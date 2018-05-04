class ImageWidget extends Actor {

	private bitmap : egret.Bitmap;
	
	public constructor() {
		super();
	}

	public loadBitMap(name:string) {
		let bitmap = GameResourcesManager.createBitmapByName(name);
		this.bitmap = bitmap;
		this.view = bitmap;
	}
}