/**
 * Created By Lu Yao
 * 
 * 2018-04-01
 */

class GameResourcesManager {

    public static createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
}



