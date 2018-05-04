/**
 * Created By Lu Yao
 * 
 * 2018-04-01
 */

class Actor extends GameObject {
	public view:egret.DisplayObject;

	private stage: egret.Stage;
	private parent: Group;
	private actions: Array<Action> = new Array<Action>();
	private name: string;
	private visible: boolean;
	public x: number;
	public y: number;
	public width: number;

	public widthTest: number;


	public height: number;
	public originX: number;
	public originY: number;
	public scaleX: number;
	public scaleY: number;
	public rotation: number;
	public color: number;
	private listeners: Array<any> = new Array<any>();

	public act(delta: number) {
		for (let i = 0; i < this.actions.length; i++) {
			let action = this.actions[i];
			if (action.act(delta) && i < this.actions.length) {
				this.actions.splice(i, 1);
				action.setActor(null);
				i--;
			}
		}
	}

	public addAction(action: Action) {
		action.setActor(this);
		this.actions.push(action);
	}

	public removeAction(action: Action) {
		var index = this.actions.indexOf(action, 0);
		if (index > -1) {
			this.actions.splice(index, 1);
			action.setActor(null)
		}
	}

	public getActions(): Array<Action> {
		return this.actions;
	}

	public clearActions() {
		for (let i = this.actions.length - 1; i >= 0; i--)
			this.actions[i].setActor(null);
		this.actions.length = 0;
	}

	public getStage(): egret.Stage {
		return this.stage;
	}

	protected setStage(stage: egret.Stage) {
		this.stage = stage;
	}

	public hasParent(): boolean {
		return this.parent != null;
	}

	public getParent(): Group {
		return this.parent;
	}

	public setParent(parent : Group) {
		this.parent = parent;
	}

	public remove()
	{
		if(this.parent != null) {
			this.parent.removeChild(this);
		}
	}

	public isVisible(): boolean {
		return this.visible;
	}

	public setVisible(visible: boolean) {
		this.visible = visible;
	}

	public getX(): number {
		return this.x;
	}

	public setX(x: number) {
		this.x = x;
		this.positionChanged();
	}

	public getY(): number {
		return this.y;
	}

	public setY(y: number) {
		this.y = y;
		this.positionChanged();
	}

	public setPosition(x: number, y: number) {
		this.x = x;
		this.y = y;
		this.positionChanged();
	}

	public translate(x: number, y: number) {
		this.x += x;
		this.y += y;
		this.positionChanged();
	}

	protected positionChanged()
	{
		this.view.x = this.x;
		this.view.y = this.y;
	}

	public getWidth(): number {
		return this.width;
	}

	public setWidth(width: number) {
		let oldWidth = this.width;
		this.width = width;
		if (this.width != oldWidth) this.sizeChanged();
	}

	public getHeight(): number {
		return this.height;
	}

	public setHeight(height: number) {
		let oldHeight = this.height;
		this.height = height;
		if (this.height != oldHeight) this.sizeChanged();
	}

	public getTop() {
		return this.y + this.height;
	}

	public getRight() {
		return this.x + this.width;
	}

	protected sizeChanged() {
		this.view.width = this.width;
		this.view.height = this.height;
	}

	public setSize(width: number, height: number) {
		let oldWidth = this.width;
		let oldHeight = this.height;
		this.width = width;
		this.height = height;
		if (this.width != oldWidth || this.height != oldHeight) this.sizeChanged();
	}

	public size(width: number, height: number) {
		this.width += width;
		this.height += height;
		this.sizeChanged();
	}

	public setBounds(x, y, width, height) {
		let oldWidth = this.width;
		let oldHeight = this.height;
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		if (this.width != oldWidth || this.height != oldHeight) this.sizeChanged();
	}

	public getOriginX() {
		return this.originX;
	}

	public setOriginX(originX) {
		this.originX = originX;
	}

	public getOriginY() {
		return this.originY;
	}

	public setOriginY(originY) {
		this.originY = originY;
	}

	public setOrigin(originX, originY) {
		this.originX = originX;
		this.originY = originY;
	}

	public getScaleX() {
		return this.scaleX;
	}

	public setScaleX(scaleX) {
		this.scaleX = scaleX;
		this.scaleChanged();
	}

	public getScaleY() {
		return this.scaleY;
	}

	public setScaleY(scaleY) {
		this.scaleY = scaleY;
		this.scaleChanged();
	}

	public setScale(scaleX, scaleY) {
		this.scaleX = scaleX;
		this.scaleY = scaleY;
		this.scaleChanged();
	}

	public scale(scaleX, scaleY) {
		this.scaleX += scaleX;
		this.scaleY += scaleY;
		this.scaleChanged();
	}

	protected scaleChanged(){

	}

	public getRotation() {
		return this.rotation;
	}

	public setRotation(degrees) {
		this.rotation = degrees;
	}

	public rotate(amountInDegrees) {
		this.rotation += amountInDegrees;
	}

	public setColor(color) {
		this.color = color;
	}

	public getColor() {
		return this.color;
	}

	public getName() {
		return this.name;
	}

	public setName(name) {
		this.name = name;
	}

	public addListener(touchEventType,eventCallBack,thisObject?:any) {
		if(eventCallBack) {
			this.view.touchEnabled = true;
			this.listeners.push(eventCallBack);
			if(thisObject) {
				this.view.addEventListener(touchEventType,eventCallBack,thisObject)
			} else {
				this.view.addEventListener(touchEventType,eventCallBack,this.view)
			}
		}
	}

	public removeListener(eventCallBack) {
		var index = this.listeners.indexOf(eventCallBack, 0);
		if (index > -1) {
			this.listeners.splice(index, 1);
			this.view.removeEventListener(egret.TouchEvent.TOUCH_TAP,eventCallBack,this.view);
		}
	}

	public clearListeners() {
		// for(let i = 0; i < this.listeners.length;i++) {
		// 	this.view.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.listeners[i],this.view);
		// }
		// this.listeners.length = 0;
	}

	public onDestroy():void {

    } 

	public hitTestRec(x:number,y:number,width:number,height:number):boolean {
		let ltIn = this.view.hitTestPoint(x - 1,y - 1);
		let rtIn = this.view.hitTestPoint(x + width + 1,y -1);
		let lbIn = this.view.hitTestPoint(x - 1,y + height + 1);
		let rbIn = this.view.hitTestPoint(x + width + 1,y + height + 1);
		return ltIn || rtIn ||  lbIn ||  rbIn;
	}
}