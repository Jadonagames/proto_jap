class LoadScreen {

    static STATE = Object.freeze({
        Main: 0,
    });

    static currentState = LoadScreen.STATE.Main;

    static list = [];

    constructor() {
    }

    static init() {
        canvas.style.backgroundColor = "rgb(213, 210, 193)";

        this.bBool = false;
        this.loadTimer = new Timer(2, LoadScreen.stopLoading.bind(this));
        this.loadingSprite = new Sprite({ w: 16, h: 16 }, centerX(16), centerY(16))
        this.loadingSprite.addAnimation("normal", { x: 48, y: 16 }, 8, [0.3, 0.1, 0.05, 0.05, 0.05, 0.05, 0.05, 0.1]);
        this.loadingSprite.changeAnimation("normal");
        LoadScreen.list.push(this.loadingSprite);
    }

    static stopLoading() {
        this.bBool = true;
        changeMainState(MAIN_STATE.Language);
    }

    static update(dt) {

        this.loadTimer.update(dt);

        Sprite.manageBeforeUpdating(LoadScreen.list, dt);

        LoadScreen.list = LoadScreen.list.filter(sp => {
            return !sp.delete;
        });
    }

    static draw(ctx) {

        Sprite.manageBeforeDrawing(LoadScreen.list);
        /*
        * DEBUG
        */

        if (!this.bBool) {

            ctx.font = "10px jpfont";

            ctx.fillStyle = "rgb(255, 255, 255)";
            ctx.fillText("あいうえお", 10, 50);
            ctx.fillText("かきくけこ", 10, 60);
            ctx.fillText("さしすせそ", 10, 70);
            ctx.fillText("たちつてと", 10, 80);
            ctx.fillText("なにぬねの", 10, 90);
            ctx.fillText("はひふへほ", 10, 100);
            ctx.fillText("まみむめも", 10, 110);
            ctx.fillText("や　ゆ　よ", 10, 120);
            ctx.fillText("らりるれろ", 10, 130);
            ctx.fillText("わ　　　を", 10, 140);
            ctx.fillText("ん", 10, 150);

            ctx.font = "10px kyokasho";

            ctx.fillText("アイウエオ", 100, 50);
            ctx.fillText("カキクケコ", 100, 60);
            ctx.fillText("サシスセソ", 100, 70);
            ctx.fillText("タチツテト", 100, 80);
            ctx.fillText("ナニヌネノ", 100, 90);
            ctx.fillText("ハヒフヘホ", 100, 100);
            ctx.fillText("マミムメモ", 100, 110);
            ctx.fillText("ヤ　ユ　ヨ", 100, 120);
            ctx.fillText("ラリルレロ", 100, 130);
            ctx.fillText("ワ　　　ヲ", 100, 140);
            ctx.fillText("ン", 100, 150);
        }

        // --------------- END DEBUG
    }

}