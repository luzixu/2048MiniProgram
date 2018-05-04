/**
 * Created By Lu Yao
 * 
 * 2018-04-01
 */

class GameScene extends Scene {

	private matrix4x4: Array<Array<number>>;

	private matrix4x4Display: Array<Array<LabelWidget>>;

	private static MoveLeft = 1;

	private static MoveRight = 2;

	private static MoveUp = 3;

	private static MoveDown = 4;

	private touchBeginX = 0;

	private touchBeginY = 0;

	private cols = 4;

	private rows = 4;

	private score = 0;

	private scoreLabelWidget : LabelWidget;

	private resetButton : LabelWidget;

	public onStart() {
		super.onStart();
		this.runGame().catch(e => {
			console.log(e);
		})
	}

	private async runGame() {
		await platform.login();
		const userInfo = await platform.getUserInfo();
		UserData.userName = userInfo.nickName;
		await this.loadResource()
		this.createGameScene();
	}

	private async loadResource() {
		try {
			const loadingView = new LoadingGameScene();
			this.stage.addChild(loadingView);
			await RES.loadConfig("resource/default.res.json", "resource/");
			await RES.loadGroup("preload", 0, loadingView);
			this.stage.removeChild(loadingView);
		}
		catch (e) {
			console.error(e);
		}
	}


	private resetGame() {
		this.score = 0;

		for (let row = 0; row < this.rows; row++) {
			let arr = this.matrix4x4[row];
			for (let col = 0; col < this.cols; col++) {
				arr[col] = 0;
			}
		}
		let randomNum = 2;
		while (randomNum > 0) {
			let randomPos = MathUtils.randomInt(0, 16);
			console.log("random randomPos " + randomPos);
			let row = Math.floor(randomPos / this.rows);
			let col = Math.floor(randomPos - row * this.rows);
			console.log("random row col " + row + "," + col);
			if (this.matrix4x4[row][col] == 0) {
				randomNum--;
				this.matrix4x4[row][col] = Math.floor(Math.random() * 2 + 1) * 2;
			}
		}
		this.dispay();
	}

	private dispay() {
		for (let row = 0; row < this.rows; row++) {
			let arr = this.matrix4x4[row];
			let labels = this.matrix4x4Display[row];
			for (let col = 0; col < this.cols; col++) {
				let label = labels[col];
				if (arr[col] != 0) {
					label.textContent = arr[col].toString();
				} else {
					label.textContent = "";
				}
			}
		}
		this.scoreLabelWidget.textContent = "SCORE: " + this.score.toString();
	}

    /**
     * 创建游戏场景
     * Create a game scene
     */
	private createGameScene() {
		let background = new ImageWidget();
		background.loadBitMap("beijing_png");
		background.setSize(DisplayData.StageWidth, DisplayData.StageHeight);
		background.setPosition(0, 0);
		this.addActor(background);

		this.scoreLabelWidget = new LabelWidget();
		this.scoreLabelWidget.setPosition(200,200);
		this.scoreLabelWidget.textColor = 0x000000;
		this.scoreLabelWidget.setSize(400, 90);
		this.scoreLabelWidget.textSize = 24;
		this.scoreLabelWidget.textAlign = egret.HorizontalAlign.LEFT;
		this.scoreLabelWidget.textVerticalAlign = egret.VerticalAlign.MIDDLE;
		this.addActor(this.scoreLabelWidget);

		this.resetButton = new LabelWidget();
		this.resetButton.setPosition(200,330);
		this.resetButton.textColor = 0x000000;
		this.resetButton.setSize(400, 90);
		this.resetButton.textSize = 24;
		this.resetButton.textContent = "RESET";
		this.resetButton.textAlign = egret.HorizontalAlign.LEFT;
		this.resetButton.textVerticalAlign = egret.VerticalAlign.MIDDLE;
		this.addActor(this.resetButton);


		this.matrix4x4 = new Array<Array<number>>();
		for (let row = 0; row < this.rows; row++) {
			this.matrix4x4.push(new Array<number>(4));
		}

		this.matrix4x4Display = new Array<Array<LabelWidget>>();
		for (let row = 0; row < this.rows; row++) {
			let rowArray = new Array<LabelWidget>();
			for (let col = 0; col < this.cols; col++) {
				let label = new LabelWidget();
				label.setPosition(col * 90 + 150, row * 90 + 400);
				label.textColor = 0x000000;
				label.setSize(90, 90);
				label.textSize = 48;
				label.textBorder = true;
				label.textAlign = egret.HorizontalAlign.CENTER;
				label.textVerticalAlign = egret.VerticalAlign.MIDDLE;
				label.background = true;
				label.backgroundColor = 0xffffff;
				
				rowArray.push(label);
				this.addActor(label);
			}
			this.matrix4x4Display.push(rowArray);
		}
		this.resetGame();
		this.getRoot().addListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
		this.getRoot().addListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
		this.getRoot().addListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);

		this.resetButton.addListener(egret.TouchEvent.TOUCH_TAP, this.onClickReset, this);
	}


	public onUpdate() {
		super.onUpdate();
	}

	private onClickReset(evt: egret.TouchEvent) {
		this.resetGame();
	}

	private onTouchBegin(evt: egret.TouchEvent) {
		let positionX: number = Math.floor(evt.stageX);
		let positionY: number = Math.floor(evt.stageY);
		this.touchBeginX = positionX;
		this.touchBeginY = positionY;
	}


	private left(arr, i) {
		let moved = false;
		let len = arr[i].length;
		for (let j = 0; j < len - 1; j++) {
			if (arr[i][j] == 0 && arr[i][j + 1] != 0) {
				let temp = arr[i][j];
				arr[i][j] = arr[i][j + 1];
				arr[i][j + 1] = temp;
				this.left(arr, i);
				moved = true;
			}
		}
		return moved;
	}

	private right(arr, i) {
		let moved = false;
		let len = arr[i].length;
		for (let j = len - 1; j > 0; j--) {
			if (arr[i][j] == 0 && arr[i][j - 1] != 0) {
				let temp = arr[i][j];
				arr[i][j] = arr[i][j - 1];
				arr[i][j - 1] = temp;
				this.right(arr, i);
				moved = true;

			}
		}
		return moved;
	}

	private up(arr, j) {
		let moved = false;
		let len = arr.length;
		for (let i = 0; i < len - 1; i++) {
			if (arr[i][j] == 0 && arr[i + 1][j] != 0) {
				let temp = arr[i][j];
				arr[i][j] = arr[i + 1][j];
				arr[i + 1][j] = temp;
				this.up(arr, j);
				moved = true;
			}
		}
		return moved;
	}

	private down(arr, j) {
		let moved = false;
		let len = arr.length;
		for (let i = len - 1; i > 0; i--) {
			if (arr[i][j] == 0 && arr[i - 1][j] != 0) {
				let temp = arr[i][j];
				arr[i][j] = arr[i - 1][j];
				arr[i - 1][j] = temp;
				this.down(arr, j);
				moved = true;
			}
		}
		return moved;
	}

	private lcombine(arr, i) {
		let moved = false;
		let len = arr[i].length;

		for (let j = 0; j < len - 1; j++) {
			if (arr[i][j] == arr[i][j + 1] && arr[i][j] != 0) {
				arr[i][j] *= 2;
				arr[i][j + 1] = 0;
				this.left(arr, i);
				moved = true;
				this.score++;
				break;
			}
		}
		return moved;
	}

	private rcombine(arr, i) {
		let moved = false;
		let len = arr[i].length;

		for (let j = len - 1; j > 0; j--) {
			if (arr[i][j] == arr[i][j - 1]&& arr[i][j] != 0) {
				arr[i][j] *= 2;
				arr[i][j - 1] = 0;
				this.right(arr, i);
				moved = true;
				this.score++;
				break;
			}
		}
		return moved;
	}

	private ucombine(arr, j) {
		let moved = false;
		let len = arr.length;

		for (let i = 0; i < len - 1; i++) {
			if (arr[i][j] == arr[i + 1][j]&& arr[i][j] != 0) {
				arr[i][j] *= 2;
				arr[i + i][j] = 0;
				this.up(arr, j);
				moved = true;
				this.score++;
				break;
			}
		}
		return moved;
	}

	private dcombine(arr, j) {
		let moved = false;
		let len = arr.length;

		for (let i = len - 1; i > 0; i--) {
			if (arr[i][j] == arr[i - 1][j]&& arr[i][j] != 0) {
				arr[i][j] *= 2;
				arr[i - 1][j] = 0;
				this.down(arr, j);
				this.score++;
				moved = true;
				break;
			}
		}
		return moved;
	}

	private addnew() {
		while (true) {
			let pos = Math.floor(Math.random() * 16);
			let i = Math.floor(pos / 4);
			let j = Math.floor(pos % 4);

			if (this.matrix4x4[i][j] == 0) {
				this.matrix4x4[i][j] = Math.floor(Math.random() * 2 + 1) * 2;
				break;
			}
		}
	}

	private onTouchMove(evt: egret.TouchEvent) {

	}

	private onTouchEnd(evt: egret.TouchEvent) {
		console.log("onTouchEnd");
		let positionX: number = Math.floor(evt.stageX);
		let positionY: number = Math.floor(evt.stageY);
		let deltaX = positionX - this.touchBeginX;
		let deltaY = positionY - this.touchBeginY;
		if(Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10) {
			return;
		}
		if (Math.abs(deltaX) > Math.abs(deltaY)) {
			if (deltaX < 0) {
				let moved = false;
				for (let i = 0; i < 4; i++) {
					if (this.left(this.matrix4x4, i)) {
						moved = true;
					}
				}
				for (let i = 0; i < 4; i++) {
					if (this.lcombine(this.matrix4x4, i)) {
						moved = true;
					}
				}
				if (moved) {
					this.addnew();
					this.dispay();
				}
			} else {
				let moved = false;
				for (let i = 0; i < 4; i++) {
					if (this.right(this.matrix4x4, i)) {
						moved = true;
					}
				}
				for (let i = 0; i < 4; i++) {
					if (this.rcombine(this.matrix4x4, i)) {
						moved = true;
					}
				}
				if (moved) {
					this.addnew();
					this.dispay();
				}
			}
		} else {
			if (deltaY < 0) {
				let moved = false;
				for (let i = 0; i < 4; i++) {
					if (this.up(this.matrix4x4, i)) {
						moved = true;
					}
				}
				for (let i = 0; i < 4; i++) {
					if (this.ucombine(this.matrix4x4, i)) {
						moved = true;
					}
				}
				if (moved) {
					this.addnew();
					this.dispay();
				}
			} else {
				let moved = false;
				for (let i = 0; i < 4; i++) {
					if (this.down(this.matrix4x4, i)) {
						moved = true;
					}
				}
				for (let i = 0; i < 4; i++) {
					if (this.dcombine(this.matrix4x4, i)) {
						moved = true;
					}
				}
				if (moved) {
					this.addnew();
					this.dispay();
				}
			}
		}
	}
}
