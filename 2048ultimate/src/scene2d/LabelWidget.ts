class LabelWidget extends Actor {

	private label:egret.TextField;

	public constructor() {
		super();
		this.label = new egret.TextField();
		
		this.view = this.label;
		this.label.multiline = false;
	}

	public get textContent():string {
		return this.label.text;
	}

	public set textContent(text:string) {
		this.label.text = text;
		console.log("text width-->" + this.label.textWidth);
		this.label.wordWrap = true;
	}

	public set textBorder(border:boolean) {
		this.label.border = border;
	}

	public get textBorder():boolean {
		return this.label.border;
	}
	
	public set backgroundColor(c:number) {
		this.label.backgroundColor =c; 
	}

	public get backgroundColor() :number{
		return this.label.backgroundColor; 
	}

	public set background(c:boolean) {
		this.label.background =c; 
	}

	public get background() :boolean{
		return this.label.background; 
	}

	public get alpha():number {
		return this.label.alpha;
	}



	public set alpha(a:number) {
		this.label.alpha = a;
	}

	public get textAlign():string {
		return this.label.textAlign;
	}

	public set textAlign(align:string) {
		this.label.textAlign = align;
	}

	public get textVerticalAlign():string {
		return this.label.verticalAlign;
	}

	public set textVerticalAlign(align:string) {
		this.label.verticalAlign = align;
	}

	public get textSize():number {
		return this.label.size;
	}

	public set textSize(size:number) {
		this.label.size = size;
	}

	public get textColor():number {
		return this.label.textColor;
	}

	public set textColor(textColor:number) {
		this.label.textColor = textColor;
	}
}