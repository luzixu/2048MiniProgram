class Rectangle extends Actor {

	private box: egret.Shape;
	
	public constructor()
	{
		super();
		this.box = new egret.Shape();
		this.view = this.box;
	}

	private draw(){
		this.box.graphics.clear();
		this.box.graphics.beginFill(this.getColor(), 1);
		this.box.graphics.drawRect(0, 0,this.getWidth(), this.getHeight());
        this.box.graphics.endFill();
		this.box.x = this.getX();
		this.box.y = this.getY();
	}

	protected positionChanged() {
		super.positionChanged();
		this.draw();
	}

	protected sizeChanged() {
		super.sizeChanged();
		this.draw();
	}

	public setColor(color) {
		super.setColor(color);
		this.draw();
	}	
}