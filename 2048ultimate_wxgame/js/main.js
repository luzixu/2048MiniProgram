var egret = window.egret;var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var GameObject = (function (_super) {
    __extends(GameObject, _super);
    function GameObject() {
        var _this = _super.call(this) || this;
        _this.key = "gameObject";
        GameObject.serial++;
        return _this;
    }
    GameObject.prototype.onCreate = function () {
        console.log("Create GameObject :" + this.key);
    };
    GameObject.prototype.onDestroy = function () {
    };
    GameObject.prototype.onEnterFrame = function (advancedTime) {
    };
    GameObject.serial = 0;
    return GameObject;
}(egret.HashObject));
__reflect(GameObject.prototype, "GameObject");
/**
 * Created By Lu Yao
 *
 * 2018-04-01
 */
var Action = (function (_super) {
    __extends(Action, _super);
    function Action() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Action.prototype.restart = function () {
    };
    Action.prototype.getActor = function () {
        return this.actor;
    };
    Action.prototype.setActor = function (actor) {
        this.actor = actor;
        if (actor == null) {
            if (this.pool != null) {
                this.pool.destroyObject(actor);
                this.pool = null;
            }
        }
    };
    Action.prototype.reset = function () {
        this.restart();
    };
    Action.prototype.getPool = function () {
        return this.pool;
    };
    Action.prototype.setPool = function (pool) {
        this.pool = pool;
    };
    return Action;
}(GameObject));
__reflect(Action.prototype, "Action");
/**
 * Created By Lu Yao
 *
 * 2018-04-01
 */
var Actor = (function (_super) {
    __extends(Actor, _super);
    function Actor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.actions = new Array();
        _this.listeners = new Array();
        return _this;
    }
    Actor.prototype.act = function (delta) {
        for (var i = 0; i < this.actions.length; i++) {
            var action = this.actions[i];
            if (action.act(delta) && i < this.actions.length) {
                this.actions.splice(i, 1);
                action.setActor(null);
                i--;
            }
        }
    };
    Actor.prototype.addAction = function (action) {
        action.setActor(this);
        this.actions.push(action);
    };
    Actor.prototype.removeAction = function (action) {
        var index = this.actions.indexOf(action, 0);
        if (index > -1) {
            this.actions.splice(index, 1);
            action.setActor(null);
        }
    };
    Actor.prototype.getActions = function () {
        return this.actions;
    };
    Actor.prototype.clearActions = function () {
        for (var i = this.actions.length - 1; i >= 0; i--)
            this.actions[i].setActor(null);
        this.actions.length = 0;
    };
    Actor.prototype.getStage = function () {
        return this.stage;
    };
    Actor.prototype.setStage = function (stage) {
        this.stage = stage;
    };
    Actor.prototype.hasParent = function () {
        return this.parent != null;
    };
    Actor.prototype.getParent = function () {
        return this.parent;
    };
    Actor.prototype.setParent = function (parent) {
        this.parent = parent;
    };
    Actor.prototype.remove = function () {
        if (this.parent != null) {
            this.parent.removeChild(this);
        }
    };
    Actor.prototype.isVisible = function () {
        return this.visible;
    };
    Actor.prototype.setVisible = function (visible) {
        this.visible = visible;
    };
    Actor.prototype.getX = function () {
        return this.x;
    };
    Actor.prototype.setX = function (x) {
        this.x = x;
        this.positionChanged();
    };
    Actor.prototype.getY = function () {
        return this.y;
    };
    Actor.prototype.setY = function (y) {
        this.y = y;
        this.positionChanged();
    };
    Actor.prototype.setPosition = function (x, y) {
        this.x = x;
        this.y = y;
        this.positionChanged();
    };
    Actor.prototype.translate = function (x, y) {
        this.x += x;
        this.y += y;
        this.positionChanged();
    };
    Actor.prototype.positionChanged = function () {
        this.view.x = this.x;
        this.view.y = this.y;
    };
    Actor.prototype.getWidth = function () {
        return this.width;
    };
    Actor.prototype.setWidth = function (width) {
        var oldWidth = this.width;
        this.width = width;
        if (this.width != oldWidth)
            this.sizeChanged();
    };
    Actor.prototype.getHeight = function () {
        return this.height;
    };
    Actor.prototype.setHeight = function (height) {
        var oldHeight = this.height;
        this.height = height;
        if (this.height != oldHeight)
            this.sizeChanged();
    };
    Actor.prototype.getTop = function () {
        return this.y + this.height;
    };
    Actor.prototype.getRight = function () {
        return this.x + this.width;
    };
    Actor.prototype.sizeChanged = function () {
        this.view.width = this.width;
        this.view.height = this.height;
    };
    Actor.prototype.setSize = function (width, height) {
        var oldWidth = this.width;
        var oldHeight = this.height;
        this.width = width;
        this.height = height;
        if (this.width != oldWidth || this.height != oldHeight)
            this.sizeChanged();
    };
    Actor.prototype.size = function (width, height) {
        this.width += width;
        this.height += height;
        this.sizeChanged();
    };
    Actor.prototype.setBounds = function (x, y, width, height) {
        var oldWidth = this.width;
        var oldHeight = this.height;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        if (this.width != oldWidth || this.height != oldHeight)
            this.sizeChanged();
    };
    Actor.prototype.getOriginX = function () {
        return this.originX;
    };
    Actor.prototype.setOriginX = function (originX) {
        this.originX = originX;
    };
    Actor.prototype.getOriginY = function () {
        return this.originY;
    };
    Actor.prototype.setOriginY = function (originY) {
        this.originY = originY;
    };
    Actor.prototype.setOrigin = function (originX, originY) {
        this.originX = originX;
        this.originY = originY;
    };
    Actor.prototype.getScaleX = function () {
        return this.scaleX;
    };
    Actor.prototype.setScaleX = function (scaleX) {
        this.scaleX = scaleX;
        this.scaleChanged();
    };
    Actor.prototype.getScaleY = function () {
        return this.scaleY;
    };
    Actor.prototype.setScaleY = function (scaleY) {
        this.scaleY = scaleY;
        this.scaleChanged();
    };
    Actor.prototype.setScale = function (scaleX, scaleY) {
        this.scaleX = scaleX;
        this.scaleY = scaleY;
        this.scaleChanged();
    };
    Actor.prototype.scale = function (scaleX, scaleY) {
        this.scaleX += scaleX;
        this.scaleY += scaleY;
        this.scaleChanged();
    };
    Actor.prototype.scaleChanged = function () {
    };
    Actor.prototype.getRotation = function () {
        return this.rotation;
    };
    Actor.prototype.setRotation = function (degrees) {
        this.rotation = degrees;
    };
    Actor.prototype.rotate = function (amountInDegrees) {
        this.rotation += amountInDegrees;
    };
    Actor.prototype.setColor = function (color) {
        this.color = color;
    };
    Actor.prototype.getColor = function () {
        return this.color;
    };
    Actor.prototype.getName = function () {
        return this.name;
    };
    Actor.prototype.setName = function (name) {
        this.name = name;
    };
    Actor.prototype.addListener = function (touchEventType, eventCallBack, thisObject) {
        if (eventCallBack) {
            this.view.touchEnabled = true;
            this.listeners.push(eventCallBack);
            if (thisObject) {
                this.view.addEventListener(touchEventType, eventCallBack, thisObject);
            }
            else {
                this.view.addEventListener(touchEventType, eventCallBack, this.view);
            }
        }
    };
    Actor.prototype.removeListener = function (eventCallBack) {
        var index = this.listeners.indexOf(eventCallBack, 0);
        if (index > -1) {
            this.listeners.splice(index, 1);
            this.view.removeEventListener(egret.TouchEvent.TOUCH_TAP, eventCallBack, this.view);
        }
    };
    Actor.prototype.clearListeners = function () {
        // for(let i = 0; i < this.listeners.length;i++) {
        // 	this.view.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.listeners[i],this.view);
        // }
        // this.listeners.length = 0;
    };
    Actor.prototype.onDestroy = function () {
    };
    Actor.prototype.hitTestRec = function (x, y, width, height) {
        var ltIn = this.view.hitTestPoint(x - 1, y - 1);
        var rtIn = this.view.hitTestPoint(x + width + 1, y - 1);
        var lbIn = this.view.hitTestPoint(x - 1, y + height + 1);
        var rbIn = this.view.hitTestPoint(x + width + 1, y + height + 1);
        return ltIn || rtIn || lbIn || rbIn;
    };
    return Actor;
}(GameObject));
__reflect(Actor.prototype, "Actor");
/**
 * Created By Lu Yao
 *
 * 2018-04-01
 */
var Scene = (function (_super) {
    __extends(Scene, _super);
    function Scene() {
        var _this = _super.call(this) || this;
        _this.root = new Group();
        _this.addChild(_this.root.view);
        return _this;
    }
    Scene.prototype.getRoot = function () {
        return this.root;
    };
    Scene.prototype.addActor = function (actor) {
        this.root.addChild(actor);
        console.log("scene actor length:" + this.root.childrenSize());
    };
    Scene.prototype.onEnter = function () {
    };
    Scene.prototype.onStart = function () {
        this.root.setPosition(0, 0);
        this.root.setSize(DisplayData.StageWidth, DisplayData.StageHeight);
    };
    Scene.prototype.onUpdate = function () {
        var deltaTime = Graphics.getInstance().getDeltaTime();
        this.root.act(deltaTime);
    };
    Scene.prototype.onExit = function () {
    };
    Scene.prototype.onPause = function () {
    };
    Scene.prototype.onResume = function () {
    };
    return Scene;
}(egret.DisplayObjectContainer));
__reflect(Scene.prototype, "Scene");
var DelegateAction = (function (_super) {
    __extends(DelegateAction, _super);
    function DelegateAction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DelegateAction.prototype.setAction = function (action) {
        this.action = action;
    };
    DelegateAction.prototype.getAction = function () {
        return this.action;
    };
    DelegateAction.prototype.act = function (delta) {
        var pool = this.getPool();
        this.setPool(null);
        try {
            return this.delegate(delta);
        }
        catch (error) {
        }
        finally {
            this.setPool(null);
        }
    };
    DelegateAction.prototype.restart = function () {
        if (this.action != null) {
            this.action.restart();
        }
    };
    DelegateAction.prototype.reset = function () {
        _super.prototype.reset.call(this);
        this.action = null;
    };
    DelegateAction.prototype.setActor = function (actor) {
        if (this.action != null) {
            this.action.setActor(actor);
        }
        _super.prototype.setActor.call(this, actor);
    };
    return DelegateAction;
}(Action));
__reflect(DelegateAction.prototype, "DelegateAction");
var TemporalAction = (function (_super) {
    __extends(TemporalAction, _super);
    function TemporalAction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TemporalAction.prototype.act = function (delta) {
        if (this.complete)
            return true;
        var pool = this.getPool();
        this.setPool(null); // Ensure this action can't be returned to the pool while executing.
        try {
            if (!this.began) {
                this.begin();
                this.began = true;
            }
            this.time += delta;
            this.complete = this.time >= this.duration;
            var percent = 0;
            if (this.complete)
                percent = 1;
            else {
                percent = this.time / this.duration;
                if (this.interpolation != null) {
                    percent = this.interpolation.applysimple(percent);
                }
            }
            this.update(this.reverse ? 1 - percent : percent);
            if (this.complete)
                this.end();
            return this.complete;
        }
        finally {
            this.setPool(pool);
        }
    };
    TemporalAction.prototype.begin = function () {
    };
    TemporalAction.prototype.end = function () {
    };
    TemporalAction.prototype.finish = function () {
        this.time = this.duration;
    };
    TemporalAction.prototype.restart = function () {
        this.time = 0;
        this.began = false;
        this.complete = false;
    };
    TemporalAction.prototype.reset = function () {
        _super.prototype.reset.call(this);
        this.reverse = false;
        this.interpolation = null;
    };
    TemporalAction.prototype.getTime = function () {
        return this.time;
    };
    TemporalAction.prototype.setTime = function (time) {
        this.time = time;
    };
    TemporalAction.prototype.getDuration = function () {
        return this.duration;
    };
    TemporalAction.prototype.setDuration = function (duration) {
        this.duration = duration;
    };
    TemporalAction.prototype.getInterpolation = function () {
        return this.interpolation;
    };
    TemporalAction.prototype.setInterpolation = function (interpolation) {
        this.interpolation = interpolation;
    };
    TemporalAction.prototype.isReverse = function () {
        return this.reverse;
    };
    TemporalAction.prototype.setReverse = function (reverse) {
        this.reverse = reverse;
    };
    return TemporalAction;
}(Action));
__reflect(TemporalAction.prototype, "TemporalAction");
var LabelWidget = (function (_super) {
    __extends(LabelWidget, _super);
    function LabelWidget() {
        var _this = _super.call(this) || this;
        _this.label = new egret.TextField();
        _this.view = _this.label;
        _this.label.multiline = false;
        return _this;
    }
    Object.defineProperty(LabelWidget.prototype, "textContent", {
        get: function () {
            return this.label.text;
        },
        set: function (text) {
            this.label.text = text;
            console.log("text width-->" + this.label.textWidth);
            this.label.wordWrap = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LabelWidget.prototype, "textBorder", {
        get: function () {
            return this.label.border;
        },
        set: function (border) {
            this.label.border = border;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LabelWidget.prototype, "backgroundColor", {
        get: function () {
            return this.label.backgroundColor;
        },
        set: function (c) {
            this.label.backgroundColor = c;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LabelWidget.prototype, "background", {
        get: function () {
            return this.label.background;
        },
        set: function (c) {
            this.label.background = c;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LabelWidget.prototype, "alpha", {
        get: function () {
            return this.label.alpha;
        },
        set: function (a) {
            this.label.alpha = a;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LabelWidget.prototype, "textAlign", {
        get: function () {
            return this.label.textAlign;
        },
        set: function (align) {
            this.label.textAlign = align;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LabelWidget.prototype, "textVerticalAlign", {
        get: function () {
            return this.label.verticalAlign;
        },
        set: function (align) {
            this.label.verticalAlign = align;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LabelWidget.prototype, "textSize", {
        get: function () {
            return this.label.size;
        },
        set: function (size) {
            this.label.size = size;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LabelWidget.prototype, "textColor", {
        get: function () {
            return this.label.textColor;
        },
        set: function (textColor) {
            this.label.textColor = textColor;
        },
        enumerable: true,
        configurable: true
    });
    return LabelWidget;
}(Actor));
__reflect(LabelWidget.prototype, "LabelWidget");
/**
 * Created By Lu Yao
 *
 * 2018-04-01
 */
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.touchBeginX = 0;
        _this.touchBeginY = 0;
        _this.cols = 4;
        _this.rows = 4;
        _this.score = 0;
        return _this;
    }
    GameScene.prototype.onStart = function () {
        _super.prototype.onStart.call(this);
        this.runGame().catch(function (e) {
            console.log(e);
        });
    };
    GameScene.prototype.runGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            var userInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, platform.login()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, platform.getUserInfo()];
                    case 2:
                        userInfo = _a.sent();
                        UserData.userName = userInfo.nickName;
                        return [4 /*yield*/, this.loadResource()];
                    case 3:
                        _a.sent();
                        this.createGameScene();
                        return [2 /*return*/];
                }
            });
        });
    };
    GameScene.prototype.loadResource = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loadingView, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        loadingView = new LoadingGameScene();
                        this.stage.addChild(loadingView);
                        return [4 /*yield*/, RES.loadConfig("resource/default.res.json", "resource/")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup("preload", 0, loadingView)];
                    case 2:
                        _a.sent();
                        this.stage.removeChild(loadingView);
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    GameScene.prototype.resetGame = function () {
        this.score = 0;
        for (var row = 0; row < this.rows; row++) {
            var arr = this.matrix4x4[row];
            for (var col = 0; col < this.cols; col++) {
                arr[col] = 0;
            }
        }
        var randomNum = 2;
        while (randomNum > 0) {
            var randomPos = MathUtils.randomInt(0, 16);
            console.log("random randomPos " + randomPos);
            var row = Math.floor(randomPos / this.rows);
            var col = Math.floor(randomPos - row * this.rows);
            console.log("random row col " + row + "," + col);
            if (this.matrix4x4[row][col] == 0) {
                randomNum--;
                this.matrix4x4[row][col] = Math.floor(Math.random() * 2 + 1) * 2;
            }
        }
        this.dispay();
    };
    GameScene.prototype.dispay = function () {
        for (var row = 0; row < this.rows; row++) {
            var arr = this.matrix4x4[row];
            var labels = this.matrix4x4Display[row];
            for (var col = 0; col < this.cols; col++) {
                var label = labels[col];
                if (arr[col] != 0) {
                    label.textContent = arr[col].toString();
                }
                else {
                    label.textContent = "";
                }
            }
        }
        this.scoreLabelWidget.textContent = "SCORE: " + this.score.toString();
    };
    /**
     * 创建游戏场景
     * Create a game scene
     */
    GameScene.prototype.createGameScene = function () {
        var background = new ImageWidget();
        background.loadBitMap("beijing_png");
        background.setSize(DisplayData.StageWidth, DisplayData.StageHeight);
        background.setPosition(0, 0);
        this.addActor(background);
        this.scoreLabelWidget = new LabelWidget();
        this.scoreLabelWidget.setPosition(200, 200);
        this.scoreLabelWidget.textColor = 0x000000;
        this.scoreLabelWidget.setSize(400, 90);
        this.scoreLabelWidget.textSize = 24;
        this.scoreLabelWidget.textAlign = egret.HorizontalAlign.LEFT;
        this.scoreLabelWidget.textVerticalAlign = egret.VerticalAlign.MIDDLE;
        this.addActor(this.scoreLabelWidget);
        this.resetButton = new LabelWidget();
        this.resetButton.setPosition(200, 330);
        this.resetButton.textColor = 0x000000;
        this.resetButton.setSize(400, 90);
        this.resetButton.textSize = 24;
        this.resetButton.textContent = "RESET";
        this.resetButton.textAlign = egret.HorizontalAlign.LEFT;
        this.resetButton.textVerticalAlign = egret.VerticalAlign.MIDDLE;
        this.addActor(this.resetButton);
        this.matrix4x4 = new Array();
        for (var row = 0; row < this.rows; row++) {
            this.matrix4x4.push(new Array(4));
        }
        this.matrix4x4Display = new Array();
        for (var row = 0; row < this.rows; row++) {
            var rowArray = new Array();
            for (var col = 0; col < this.cols; col++) {
                var label = new LabelWidget();
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
    };
    GameScene.prototype.onUpdate = function () {
        _super.prototype.onUpdate.call(this);
    };
    GameScene.prototype.onClickReset = function (evt) {
        this.resetGame();
    };
    GameScene.prototype.onTouchBegin = function (evt) {
        var positionX = Math.floor(evt.stageX);
        var positionY = Math.floor(evt.stageY);
        this.touchBeginX = positionX;
        this.touchBeginY = positionY;
    };
    GameScene.prototype.left = function (arr, i) {
        var moved = false;
        var len = arr[i].length;
        for (var j = 0; j < len - 1; j++) {
            if (arr[i][j] == 0 && arr[i][j + 1] != 0) {
                var temp = arr[i][j];
                arr[i][j] = arr[i][j + 1];
                arr[i][j + 1] = temp;
                this.left(arr, i);
                moved = true;
            }
        }
        return moved;
    };
    GameScene.prototype.right = function (arr, i) {
        var moved = false;
        var len = arr[i].length;
        for (var j = len - 1; j > 0; j--) {
            if (arr[i][j] == 0 && arr[i][j - 1] != 0) {
                var temp = arr[i][j];
                arr[i][j] = arr[i][j - 1];
                arr[i][j - 1] = temp;
                this.right(arr, i);
                moved = true;
            }
        }
        return moved;
    };
    GameScene.prototype.up = function (arr, j) {
        var moved = false;
        var len = arr.length;
        for (var i = 0; i < len - 1; i++) {
            if (arr[i][j] == 0 && arr[i + 1][j] != 0) {
                var temp = arr[i][j];
                arr[i][j] = arr[i + 1][j];
                arr[i + 1][j] = temp;
                this.up(arr, j);
                moved = true;
            }
        }
        return moved;
    };
    GameScene.prototype.down = function (arr, j) {
        var moved = false;
        var len = arr.length;
        for (var i = len - 1; i > 0; i--) {
            if (arr[i][j] == 0 && arr[i - 1][j] != 0) {
                var temp = arr[i][j];
                arr[i][j] = arr[i - 1][j];
                arr[i - 1][j] = temp;
                this.down(arr, j);
                moved = true;
            }
        }
        return moved;
    };
    GameScene.prototype.lcombine = function (arr, i) {
        var moved = false;
        var len = arr[i].length;
        for (var j = 0; j < len - 1; j++) {
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
    };
    GameScene.prototype.rcombine = function (arr, i) {
        var moved = false;
        var len = arr[i].length;
        for (var j = len - 1; j > 0; j--) {
            if (arr[i][j] == arr[i][j - 1] && arr[i][j] != 0) {
                arr[i][j] *= 2;
                arr[i][j - 1] = 0;
                this.right(arr, i);
                moved = true;
                this.score++;
                break;
            }
        }
        return moved;
    };
    GameScene.prototype.ucombine = function (arr, j) {
        var moved = false;
        var len = arr.length;
        for (var i = 0; i < len - 1; i++) {
            if (arr[i][j] == arr[i + 1][j] && arr[i][j] != 0) {
                arr[i][j] *= 2;
                arr[i + i][j] = 0;
                this.up(arr, j);
                moved = true;
                this.score++;
                break;
            }
        }
        return moved;
    };
    GameScene.prototype.dcombine = function (arr, j) {
        var moved = false;
        var len = arr.length;
        for (var i = len - 1; i > 0; i--) {
            if (arr[i][j] == arr[i - 1][j] && arr[i][j] != 0) {
                arr[i][j] *= 2;
                arr[i - 1][j] = 0;
                this.down(arr, j);
                this.score++;
                moved = true;
                break;
            }
        }
        return moved;
    };
    GameScene.prototype.addnew = function () {
        while (true) {
            var pos = Math.floor(Math.random() * 16);
            var i = Math.floor(pos / 4);
            var j = Math.floor(pos % 4);
            if (this.matrix4x4[i][j] == 0) {
                this.matrix4x4[i][j] = Math.floor(Math.random() * 2 + 1) * 2;
                break;
            }
        }
    };
    GameScene.prototype.onTouchMove = function (evt) {
    };
    GameScene.prototype.onTouchEnd = function (evt) {
        console.log("onTouchEnd");
        var positionX = Math.floor(evt.stageX);
        var positionY = Math.floor(evt.stageY);
        var deltaX = positionX - this.touchBeginX;
        var deltaY = positionY - this.touchBeginY;
        if (Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10) {
            return;
        }
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            if (deltaX < 0) {
                var moved = false;
                for (var i = 0; i < 4; i++) {
                    if (this.left(this.matrix4x4, i)) {
                        moved = true;
                    }
                }
                for (var i = 0; i < 4; i++) {
                    if (this.lcombine(this.matrix4x4, i)) {
                        moved = true;
                    }
                }
                if (moved) {
                    this.addnew();
                    this.dispay();
                }
            }
            else {
                var moved = false;
                for (var i = 0; i < 4; i++) {
                    if (this.right(this.matrix4x4, i)) {
                        moved = true;
                    }
                }
                for (var i = 0; i < 4; i++) {
                    if (this.rcombine(this.matrix4x4, i)) {
                        moved = true;
                    }
                }
                if (moved) {
                    this.addnew();
                    this.dispay();
                }
            }
        }
        else {
            if (deltaY < 0) {
                var moved = false;
                for (var i = 0; i < 4; i++) {
                    if (this.up(this.matrix4x4, i)) {
                        moved = true;
                    }
                }
                for (var i = 0; i < 4; i++) {
                    if (this.ucombine(this.matrix4x4, i)) {
                        moved = true;
                    }
                }
                if (moved) {
                    this.addnew();
                    this.dispay();
                }
            }
            else {
                var moved = false;
                for (var i = 0; i < 4; i++) {
                    if (this.down(this.matrix4x4, i)) {
                        moved = true;
                    }
                }
                for (var i = 0; i < 4; i++) {
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
    };
    GameScene.MoveLeft = 1;
    GameScene.MoveRight = 2;
    GameScene.MoveUp = 3;
    GameScene.MoveDown = 4;
    return GameScene;
}(Scene));
__reflect(GameScene.prototype, "GameScene");
/**
 * Created By Lu Yao
 *
 * 2018-04-01
 */
var LoadingGameScene = (function (_super) {
    __extends(LoadingGameScene, _super);
    function LoadingGameScene() {
        var _this = _super.call(this) || this;
        _this.createView();
        return _this;
    }
    LoadingGameScene.prototype.createView = function () {
        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.y = 300;
        this.textField.width = 480;
        this.textField.height = 100;
        this.textField.textAlign = "center";
    };
    LoadingGameScene.prototype.onProgress = function (current, total) {
        this.textField.text = "Loading..." + current + "/" + total;
    };
    return LoadingGameScene;
}(egret.Sprite));
__reflect(LoadingGameScene.prototype, "LoadingGameScene", ["RES.PromiseTaskReporter"]);
var Interpolation = (function () {
    function Interpolation() {
    }
    Interpolation.prototype.applysimple = function (a) {
        return a;
    };
    Interpolation.prototype.apply = function (start, end, a) {
        return start + (end - start) * this.applysimple(a);
    };
    return Interpolation;
}());
__reflect(Interpolation.prototype, "Interpolation");
// static public final Pow pow2 = new Pow(2);
// static public final PowIn pow2In = new PowIn(2);
// static public final PowOut pow2Out = new PowOut(2);
// static public final Pow pow3 = new Pow(3);
// static public final PowIn pow3In = new PowIn(3);
// static public final PowOut pow3Out = new PowOut(3);
// static public final Pow pow4 = new Pow(4);
// static public final PowIn pow4In = new PowIn(4);
// static public final PowOut pow4Out = new PowOut(4);
// static public final Pow pow5 = new Pow(5);
// static public final PowIn pow5In = new PowIn(5);
// static public final PowOut pow5Out = new PowOut(5);
// static public final Interpolation sine = new Interpolation() {
// 	public float apply (float a) {
// 		return (1 - MathUtils.cos(a * MathUtils.PI)) / 2;
// 	}
// };
// static public final Interpolation sineIn = new Interpolation() {
// 	public float apply (float a) {
// 		return 1 - MathUtils.cos(a * MathUtils.PI / 2);
// 	}
// };
// static public final Interpolation sineOut = new Interpolation() {
// 	public float apply (float a) {
// 		return MathUtils.sin(a * MathUtils.PI / 2);
// 	}
// };
// static public final Interpolation exp10 = new Exp(2, 10);
// static public final Interpolation exp10In = new ExpIn(2, 10);
// static public final Interpolation exp10Out = new ExpOut(2, 10);
// static public final Interpolation exp5 = new Exp(2, 5);
// static public final Interpolation exp5In = new ExpIn(2, 5);
// static public final Interpolation exp5Out = new ExpOut(2, 5);
// static public final Interpolation circle = new Interpolation() {
// 	public float apply (float a) {
// 		if (a <= 0.5f) {
// 			a *= 2;
// 			return (1 - (float)Math.sqrt(1 - a * a)) / 2;
// 		}
// 		a--;
// 		a *= 2;
// 		return ((float)Math.sqrt(1 - a * a) + 1) / 2;
// 	}
// };
// static public final Interpolation circleIn = new Interpolation() {
// 	public float apply (float a) {
// 		return 1 - (float)Math.sqrt(1 - a * a);
// 	}
// };
// static public final Interpolation circleOut = new Interpolation() {
// 	public float apply (float a) {
// 		a--;
// 		return (float)Math.sqrt(1 - a * a);
// 	}
// };
// static public final Elastic elastic = new Elastic(2, 10);
// static public final Elastic elasticIn = new ElasticIn(2, 10);
// static public final Elastic elasticOut = new ElasticOut(2, 10);
// static public final Interpolation swing = new Swing(1.5f);
// static public final Interpolation swingIn = new SwingIn(2f);
// static public final Interpolation swingOut = new SwingOut(2f);
// static public final Interpolation bounce = new Bounce(4);
// static public final Interpolation bounceIn = new BounceIn(4);
// static public final Interpolation bounceOut = new BounceOut(4);
// //
// static public class Pow extends Interpolation {
// 	final int power;
// 	public Pow (int power) {
// 		this.power = power;
// 	}
// 	public float apply (float a) {
// 		if (a <= 0.5f) return (float)Math.pow(a * 2, power) / 2;
// 		return (float)Math.pow((a - 1) * 2, power) / (power % 2 == 0 ? -2 : 2) + 1;
// 	}
// }
// static public class PowIn extends Pow {
// 	public PowIn (int power) {
// 		super(power);
// 	}
// 	public float apply (float a) {
// 		return (float)Math.pow(a, power);
// 	}
// }
// static public class PowOut extends Pow {
// 	public PowOut (int power) {
// 		super(power);
// 	}
// 	public float apply (float a) {
// 		return (float)Math.pow(a - 1, power) * (power % 2 == 0 ? -1 : 1) + 1;
// 	}
// }
// //
// static public class Exp extends Interpolation {
// 	final float value, power, min, scale;
// 	public Exp (float value, float power) {
// 		this.value = value;
// 		this.power = power;
// 		min = (float)Math.pow(value, -power);
// 		scale = 1 / (1 - min);
// 	}
// 	public float apply (float a) {
// 		if (a <= 0.5f) return ((float)Math.pow(value, power * (a * 2 - 1)) - min) * scale / 2;
// 		return (2 - ((float)Math.pow(value, -power * (a * 2 - 1)) - min) * scale) / 2;
// 	}
// };
// static public class ExpIn extends Exp {
// 	public ExpIn (float value, float power) {
// 		super(value, power);
// 	}
// 	public float apply (float a) {
// 		return ((float)Math.pow(value, power * (a - 1)) - min) * scale;
// 	}
// }
// static public class ExpOut extends Exp {
// 	public ExpOut (float value, float power) {
// 		super(value, power);
// 	}
// 	public float apply (float a) {
// 		return 1 - ((float)Math.pow(value, -power * a) - min) * scale;
// 	}
// }
// static public class Elastic extends Interpolation {
// 		final float value, power;
// 		public Elastic (float value, float power) {
// 			this.value = value;
// 			this.power = power;
// 		}
// 		public float apply (float a) {
// 			if (a <= 0.5f) {
// 				a *= 2;
// 				return (float)Math.pow(value, power * (a - 1)) * MathUtils.sin(a * 20) * 1.0955f / 2;
// 			}
// 			a = 1 - a;
// 			a *= 2;
// 			return 1 - (float)Math.pow(value, power * (a - 1)) * MathUtils.sin((a) * 20) * 1.0955f / 2;
// 		}
// 	}
// 	static public class ElasticIn extends Elastic {
// 		public ElasticIn (float value, float power) {
// 			super(value, power);
// 		}
// 		public float apply (float a) {
// 			return (float)Math.pow(value, power * (a - 1)) * MathUtils.sin(a * 20) * 1.0955f;
// 		}
// 	}
// 	static public class ElasticOut extends Elastic {
// 		public ElasticOut ( value:number,  power:number) {
// 			super(value, power);
// 		}
// 		public  apply ( a:number) {
// 			a = 1 - a;
// 			return (1 - (float)Math.pow(value, power * (a - 1)) * MathUtils.sin(a * 20) * 1.0955f);
// 		}
// 	}
// 	 public static class Bounce extends BounceOut {
// 		public Bounce (widths : number[], heights: number[]) {
// 			super(widths, heights);
// 		}
// 		public Bounce ( bounces : number) {
// 			super(bounces);
// 		}
// 		private  out ( a : number) : number {
// 			let test = a + widths[0] / 2;
// 			if (test < widths[0]) return test / (widths[0] / 2) - 1;
// 			return super.apply(a);
// 		}
// 		public  apply ( a : number) : number {
// 			if (a <= 0.5) return (1 - out(1 - a * 2)) / 2;
// 			return out(a * 2 - 1) / 2 + 0.5;
// 		}
// 	}
// 	 public static class BounceOut extends Interpolation {
// 		 widths:number[];
// 		 heights : number[];
// 		public BounceOut (widths:number[], heights:number[]) {
// 			if (widths.length != heights.length)
// 				throw new IllegalArgumentException("Must be the same number of widths and heights.");
// 			this.widths = widths;
// 			this.heights = heights;
// 		}
// 		public BounceOut ( bounces:number) {
// 			if (bounces < 2 || bounces > 5) throw new IllegalArgumentException("bounces cannot be < 2 or > 5: " + bounces);
// 			this.widths = new number[bounces];
// 			this.heights = new number[bounces];
// 			this.heights[0] = 1;
// 			switch (bounces) {
// 			case 2:
// 				this.widths[0] = 0.6;
// 				this.widths[1] = 0.4;
// 				this.heights[1] = 0.33;
// 				break;
// 			case 3:
// 				this.widths[0] = 0.4;
// 				this.widths[1] = 0.4;
// 				this.widths[2] = 0.2;
// 				this.heights[1] = 0.33;
// 				this.heights[2] = 0.1;
// 				break;
// 			case 4:
// 				this.widths[0] = 0.34;
// 				this.widths[1] = 0.34;
// 				this.widths[2] = 0.2;
// 				this.widths[3] = 0.15;
// 				this.heights[1] = 0.26;
// 				this.heights[2] = 0.11;
// 				this.heights[3] = 0.03;
// 				break;
// 			case 5:
// 				this.widths[0] = 0.3;
// 				this.widths[1] = 0.3;
// 				this.widths[2] = 0.2;
// 				this.widths[3] = 0.1;
// 				this.widths[4] = 0.1;
// 				this.heights[1] = 0.45;
// 				this.heights[2] = 0.3;
// 				this.heights[3] = 0.15;
// 				this.heights[4] = 0.06;
// 				break;
// 			}
// 			widths[0] *= 2;
// 		}
// 		public apply ( a : number) : number {
// 			a += this.widths[0] / 2;
// 			let width = 0, height = 0;
// 			for (let i = 0, n = widths.length; i < n; i++) {
// 				width = this.widths[i];
// 				if (a <= width) {
// 					height = this.heights[i];
// 					break;
// 				}
// 				a -= width;
// 			}
// 			a /= width;
// 			let z = 4 / width * height * a;
// 			return 1 - (z - z * a) * width;
// 		}
// 	}
//  public static class BounceIn extends BounceOut {
// 		public BounceIn (widths : number[] , heights :number[] ) {
// 			super(widths, heights);
// 		}
// 		public BounceIn (bounces : number) {
// 			super(bounces);
// 		}
// 		public apply(a : number) : number {
// 			return 1 - super.apply(1 - a);
// 		}
// 	}
// 	 public static  class Swing extends Interpolation {
// 		private  scale : number;
// 		public Swing ( scale:number)  {
// 			this.scale = scale * 2;
// 		}
// 		public  apply ( a:number):number {
// 			if (a <= 0.5) {
// 				a *= 2;
// 				return a * a * ((scale + 1) * a - scale) / 2;
// 			}
// 			a--;
// 			a *= 2;
// 			return a * a * ((scale + 1) * a + scale) / 2 + 1;
// 		}
// 	}
//  public static class SwingOut extends Interpolation {
// 		private scale : number;
// 		public SwingOut ( scale: number) {
// 			this.scale = scale;
// 		}
// 		public apply (a: number) {
// 			a--;
// 			return a * a * ((scale + 1) * a + scale) + 1;
// 		}
// 	}
//  public static class SwingIn extends Interpolation {
// 		private  scale: number;
// 		public SwingIn ( scale: number) {
// 			this.scale = scale;
// 		}
// 		public  apply ( a: number) {
// 			return a * a * ((scale + 1) * a - scale);
// 		}
// 	}
// public static class SimpleInterpolation extends Interpolation {
// 		public apply  (a : number) : number {
// 			return a;
// 		}
// }
// public static class FadeInterpolation extends Interpolation {
// 		public apply  (a : number) : number {
// 			return MathUtils.clamp(a * a * a * (a * (a * 6 - 15) + 10), 0, 1);
// 		}
// } 
var MathUtils = (function () {
    function MathUtils() {
    }
    MathUtils.clamp = function (value, min, max) {
        if (value < min)
            return min;
        if (value > max)
            return max;
        return value;
    };
    MathUtils.randomInt = function (start, end) {
        var numberLen = Math.abs(end - start);
        return Math.floor(start + numberLen * Math.random());
    };
    MathUtils.randomBoolean = function () {
        var v = Math.random();
        if (v >= 0.5) {
            return true;
        }
        return false;
    };
    return MathUtils;
}());
__reflect(MathUtils.prototype, "MathUtils");
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        var _this = _super.call(this) || this;
        _this.createView();
        return _this;
    }
    LoadingUI.prototype.createView = function () {
        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.y = 300;
        this.textField.width = 480;
        this.textField.height = 100;
        this.textField.textAlign = "center";
    };
    LoadingUI.prototype.onProgress = function (current, total) {
        this.textField.text = "Loading..." + current + "/" + total;
    };
    return LoadingUI;
}(egret.Sprite));
__reflect(LoadingUI.prototype, "LoadingUI", ["RES.PromiseTaskReporter"]);
var DebugPlatform = (function () {
    function DebugPlatform() {
    }
    DebugPlatform.prototype.getUserInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, { nickName: "username" }];
            });
        });
    };
    DebugPlatform.prototype.login = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    return DebugPlatform;
}());
__reflect(DebugPlatform.prototype, "DebugPlatform", ["Platform"]);
if (!window.platform) {
    window.platform = new DebugPlatform();
}
/**
 * Created By Lu Yao
 *
 * 2018-04-01
 */
var Graphics = (function () {
    function Graphics() {
        this.lastFrameTime = egret.getTimer();
        this.deltaTime = 0;
        this.frameStart = egret.getTimer();
        this.frames = 0;
        this.fps = 0;
    }
    Graphics.prototype.onUpdate = function () {
        var now = egret.getTimer();
        this.deltaTime = (now - this.lastFrameTime) / 1000.0;
        this.lastFrameTime = now;
        if (now - this.frameStart > 1000) {
            this.fps = this.frames;
            this.frames = 0;
            this.frameStart = now;
        }
        this.frames++;
    };
    Graphics.prototype.getDeltaTime = function () {
        return this.deltaTime;
    };
    Graphics.getInstance = function () {
        if (Graphics.instance == null) {
            Graphics.instance = new Graphics();
        }
        return Graphics.instance;
    };
    return Graphics;
}());
__reflect(Graphics.prototype, "Graphics");
/**
 * Created By Lu Yao
 *
 * 2018-04-01
 */
var Group = (function (_super) {
    __extends(Group, _super);
    function Group() {
        var _this = _super.call(this) || this;
        _this.children = new Array();
        _this.container = new egret.DisplayObjectContainer();
        _this.view = _this.container;
        return _this;
    }
    Group.prototype.act = function (delta) {
        _super.prototype.act.call(this, delta);
        for (var i = 0, n = this.children.length; i < n; i++)
            this.children[i].act(delta);
    };
    Group.prototype.childrenChanged = function () {
    };
    Group.prototype.addChild = function (actor) {
        this.addChildView(actor);
        this.children.push(actor);
        actor.setParent(this);
        this.childrenChanged();
    };
    Group.prototype.childrenSize = function () {
        return this.children.length;
    };
    Group.prototype.addChildAt = function (index, actor) {
        if (index > this.children.length) {
            this.children.push(actor);
        }
        else {
            this.children.splice(index, 0, actor);
        }
        this.addChildView(actor);
        actor.setParent(this);
        this.childrenChanged();
    };
    Group.prototype.removeChild = function (actor) {
        var index = this.children.indexOf(actor);
        if (index != -1) {
            this.children.splice(index, 1);
        }
        this.removeChildView(actor);
        actor.setParent(null);
        this.childrenChanged();
    };
    Group.prototype.addChildView = function (actor) {
        if (actor.view != null) {
            this.container.addChild(actor.view);
        }
    };
    Group.prototype.removeChildView = function (actor) {
        if (actor.view != null) {
            this.container.removeChild(actor.view);
        }
    };
    return Group;
}(Actor));
__reflect(Group.prototype, "Group");
var ImageWidget = (function (_super) {
    __extends(ImageWidget, _super);
    function ImageWidget() {
        return _super.call(this) || this;
    }
    ImageWidget.prototype.loadBitMap = function (name) {
        var bitmap = GameResourcesManager.createBitmapByName(name);
        this.bitmap = bitmap;
        this.view = bitmap;
    };
    return ImageWidget;
}(Actor));
__reflect(ImageWidget.prototype, "ImageWidget");
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Main.prototype.onAddToStage = function (event) {
        egret.lifecycle.addLifecycleListener(function (context) {
            // custom lifecycle plugin
            context.onUpdate = function () {
                Game.getInstance().onUpdate();
            };
        });
        egret.lifecycle.onPause = function () {
            egret.ticker.pause();
            Game.getInstance().onPause();
        };
        egret.lifecycle.onResume = function () {
            egret.ticker.resume();
            Game.getInstance().onResume();
        };
        this.runGame().catch(function (e) {
            console.log(e);
        });
    };
    Main.prototype.runGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                Game.getInstance().setMain(this);
                Game.getInstance().init();
                return [2 /*return*/];
            });
        });
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
var Rectangle = (function (_super) {
    __extends(Rectangle, _super);
    function Rectangle() {
        var _this = _super.call(this) || this;
        _this.box = new egret.Shape();
        _this.view = _this.box;
        return _this;
    }
    Rectangle.prototype.draw = function () {
        this.box.graphics.clear();
        this.box.graphics.beginFill(this.getColor(), 1);
        this.box.graphics.drawRect(0, 0, this.getWidth(), this.getHeight());
        this.box.graphics.endFill();
        this.box.x = this.getX();
        this.box.y = this.getY();
    };
    Rectangle.prototype.positionChanged = function () {
        _super.prototype.positionChanged.call(this);
        this.draw();
    };
    Rectangle.prototype.sizeChanged = function () {
        _super.prototype.sizeChanged.call(this);
        this.draw();
    };
    Rectangle.prototype.setColor = function (color) {
        _super.prototype.setColor.call(this, color);
        this.draw();
    };
    return Rectangle;
}(Actor));
__reflect(Rectangle.prototype, "Rectangle");
var DisplayData = (function () {
    function DisplayData() {
    }
    DisplayData.BodyFactor = 90;
    return DisplayData;
}());
__reflect(DisplayData.prototype, "DisplayData");
var DelayAction = (function (_super) {
    __extends(DelayAction, _super);
    function DelayAction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DelayAction.prototype.delegate = function (delta) {
        if (this.time < this.duration) {
            this.time += delta;
            if (this.time < this.duration)
                return false;
            delta = this.time - this.duration;
        }
        if (this.action == null)
            return true;
        return this.action.act(delta);
    };
    DelayAction.prototype.finish = function () {
        this.time = this.duration;
    };
    DelayAction.prototype.restart = function () {
        _super.prototype.restart.call(this);
        this.time = 0;
    };
    DelayAction.prototype.getTime = function () {
        return this.time;
    };
    DelayAction.prototype.setTime = function (time) {
        this.time = time;
    };
    DelayAction.prototype.getDuration = function () {
        return this.duration;
    };
    DelayAction.prototype.setDuration = function (duration) {
        this.duration = duration;
    };
    return DelayAction;
}(DelegateAction));
__reflect(DelayAction.prototype, "DelayAction");
/**
 * Created By Lu Yao
 *
 * 2018-04-01
 */
var GameResourcesManager = (function () {
    function GameResourcesManager() {
    }
    GameResourcesManager.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    return GameResourcesManager;
}());
__reflect(GameResourcesManager.prototype, "GameResourcesManager");
var MoveToAction = (function (_super) {
    __extends(MoveToAction, _super);
    function MoveToAction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MoveToAction.prototype.begin = function () {
        this.startX = this.actor.getX();
        this.startY = this.actor.getY();
    };
    MoveToAction.prototype.update = function (percent) {
        this.actor.setPosition(this.startX + (this.endX - this.startX) * percent, this.startY + (this.endY - this.startY) * percent);
    };
    MoveToAction.prototype.setPosition = function (x, y) {
        this.endX = x;
        this.endY = y;
    };
    MoveToAction.prototype.getX = function () {
        return this.endX;
    };
    MoveToAction.prototype.setX = function (x) {
        this.endX = x;
    };
    MoveToAction.prototype.getY = function () {
        return this.endY;
    };
    MoveToAction.prototype.setY = function (y) {
        this.endY = y;
    };
    return MoveToAction;
}(TemporalAction));
__reflect(MoveToAction.prototype, "MoveToAction");
/**
 * Created By Lu Yao
 *
 * 2018-04-01
 */
var UserData = (function () {
    function UserData() {
    }
    UserData.userName = "No User";
    return UserData;
}());
__reflect(UserData.prototype, "UserData");
/**
 * Created By Lu Yao
 *
 * 2018-04-01
 */
var Button = (function () {
    function Button() {
    }
    return Button;
}());
__reflect(Button.prototype, "Button");
/**
 * Created By Lu Yao
 *
 * 2018-04-01
 */
var CommonPool = (function () {
    function CommonPool(max) {
        this.max = 16;
        this.freeObjects = new Array(max);
    }
    CommonPool.prototype.obtain = function () {
        return this.freeObjects.length == 0 ? this.newObject() : this.freeObjects.pop();
    };
    CommonPool.prototype.free = function (obj) {
        if (obj == null)
            throw new Error("free object is null");
        if (this.freeObjects.length < this.max) {
            this.freeObjects.push(obj);
            this.peak = Math.max(this.peak, this.freeObjects.length);
        }
        if (obj instanceof Poolable) {
            obj.reset();
        }
    };
    CommonPool.prototype.freeAll = function (objects) {
        if (objects == null)
            throw new Error("free object is null");
        for (var i = 0; i < objects.length; i++) {
            var object = objects[i];
            if (object == null)
                continue;
            if (this.freeObjects.length < this.max)
                this.freeObjects.push(object);
            if (object instanceof Poolable) {
                object.reset();
            }
        }
        this.peak = Math.max(this.peak, this.freeObjects.length);
    };
    CommonPool.prototype.clear = function () {
        this.freeObjects.length = 0;
    };
    CommonPool.prototype.getFree = function () {
        return this.freeObjects.length;
    };
    return CommonPool;
}());
__reflect(CommonPool.prototype, "CommonPool");
/**
* Created By Lu Yao
*
* 2018-04-01
*/
var CommonPools = (function () {
    function CommonPools() {
    }
    return CommonPools;
}());
__reflect(CommonPools.prototype, "CommonPools");
var Game = (function () {
    function Game() {
    }
    Game.prototype.init = function () {
        this.onCreate();
    };
    Game.prototype.onUpdate = function () {
        Graphics.getInstance().onUpdate();
        this._currentScene.onUpdate();
    };
    Game.prototype.onPause = function () {
    };
    Game.prototype.onResume = function () {
    };
    Game.prototype.setMain = function (main) {
        this._main = main;
    };
    Game.prototype.switchGameScene = function (scene) {
        this._preScene = this._currentScene;
        this._currentScene = scene;
        if (this._preScene != null) {
            this._preScene.onExit();
            this._main.removeChild(this._preScene);
        }
        if (this._currentScene != null) {
            this._currentScene.onEnter();
            this._main.addChild(this._currentScene);
            this._currentScene.x = 0;
            this._currentScene.y = 0;
        }
    };
    Game.prototype.onCreate = function () {
        var scene = new GameScene();
        this.switchGameScene(scene);
        DisplayData.StageWidth = scene.stage.stageWidth;
        DisplayData.StageHeight = scene.stage.stageHeight;
        console.log("DisplayData.StageWidth-->" + DisplayData.StageWidth);
        console.log("DisplayData.stageHeight-->" + DisplayData.StageHeight);
        scene.onStart();
    };
    Game.getInstance = function () {
        if (Game.INSTANCE == null) {
            Game.INSTANCE = new Game();
        }
        return Game.INSTANCE;
    };
    return Game;
}());
__reflect(Game.prototype, "Game");
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var ObjectPool = (function () {
    function ObjectPool() {
        this._pool = {};
    }
    ObjectPool.prototype.createObject = function (classFactory) {
        var result;
        var key = classFactory.key;
        console.log("classFactory-->" + classFactory);
        console.log("createObject key-->" + key);
        var arr = this._pool[key];
        if (arr != null && arr.length) {
            result = arr.shift();
        }
        else {
            result = new classFactory();
            result.key = key;
        }
        result.onCreate();
        return result;
    };
    ObjectPool.prototype.destroyObject = function (obj) {
        var key = obj.key;
        if (this._pool[key] == null) {
            this._pool[key] = [];
        }
        this._pool[key].push(obj);
        obj.onDestroy();
    };
    ObjectPool.getInstance = function () {
        if (ObjectPool.instance == null) {
            ObjectPool.instance = new ObjectPool();
        }
        return ObjectPool.instance;
    };
    return ObjectPool;
}());
__reflect(ObjectPool.prototype, "ObjectPool");
/**
 * Created By Lu Yao
 *
 * 2018-04-01
 */
var Poolable = (function () {
    function Poolable() {
    }
    Poolable.prototype.reset = function () { };
    return Poolable;
}());
__reflect(Poolable.prototype, "Poolable");
/**
 * Created By Lu Yao
 *
 * 2018-04-01
 */
function create(type) {
    type;
    return new type();
}
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var State = (function () {
    function State(stateMachine) {
        this.stateMachine = stateMachine;
    }
    State.prototype.setNext = function (nextState) {
        this.nextState = nextState;
    };
    State.prototype.onUpdate = function (delta) {
    };
    State.prototype.onEnter = function () {
    };
    State.prototype.onExit = function () {
    };
    return State;
}());
__reflect(State.prototype, "State");
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var StateMachine = (function () {
    function StateMachine() {
    }
    StateMachine.prototype.change = function (state) {
        if (this.currentState == state) {
            return;
        }
        if (this.currentState) {
            this.currentState.onExit();
        }
        this.currentState = state;
        this.currentState.onEnter();
    };
    return StateMachine;
}());
__reflect(StateMachine.prototype, "StateMachine");
;window.Main = Main;