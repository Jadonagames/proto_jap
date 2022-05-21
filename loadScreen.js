class LoadScreen {

    static STATE = Object.freeze({
        Main: 0,
    });

    static currentState = LoadScreen.STATE.Main;

    static list = [];

    static connectionOK = false;

    constructor() {
    }

    static init() {
        canvas.style.backgroundColor = CANVAS_ORIGIN_COLOR;

        this.bTimerOK = false;
        this.loadTimer = new Timer(2, LoadScreen.stopTimer.bind(this));

        this.loadingSprite = new Sprite({ w: 16, h: 16 }, centerX(16), centerY(16))
        this.loadingSprite.addAnimation("normal", { x: 48, y: 16 }, 8, [0.3, 0.1, 0.05, 0.05, 0.05, 0.05, 0.05, 0.1]);
        this.loadingSprite.changeAnimation("normal");
        LoadScreen.list.push(this.loadingSprite);
        API_Connection_Test();
    }

    static stopTimer() {
        this.bTimerOK = true;
    }

    static leaveLoadScreen() {
        changeMainState(MAIN_STATE.Language);
    }

    static setConnectionStatus(pConnectionOk) {
        if (pConnectionOk) {
            LoadScreen.connectionOK = true
        } else {
            this.loadingSprite.delete = true;
            changeMainState(MAIN_STATE.Error);
        }
    }

    static update(dt) {

        if (!this.bTimerOK) {
            this.loadTimer.update(dt);
        }
        Sprite.manageBeforeUpdating(LoadScreen.list, dt);

        LoadScreen.list = LoadScreen.list.filter(sp => {
            return !sp.delete;
        });
    }

    static draw(ctx) {

        Sprite.manageBeforeDrawing(LoadScreen.list);

        if (LoadScreen.connectionOK && this.bTimerOK) {
            LoadScreen.leaveLoadScreen();
        }

        ctx.font = "10px jpfont";
        ctx.textAlign = "left";

        ctx.fillStyle = CANVAS_ORIGIN_COLOR;
        ctx.fillText("あいうえお", 340, 190);
        ctx.fillText("かきくけこ", 340, 200);
        ctx.fillText("さしすせそ", 340, 210);
        ctx.fillText("たちつてと", 340, 220);
        ctx.fillText("なにぬねの", 340, 230);
        ctx.fillText("はひふへほ", 340, 240);
        ctx.fillText("まみむめも", 340, 250);
        ctx.fillText("や　ゆ　よ", 340, 260);
        ctx.fillText("らりるれろ", 340, 270);
        ctx.fillText("わ　　　を", 340, 280);
        ctx.fillText("ん", 340, 290);

        ctx.font = "10px kyokasho";

        ctx.fillText("アイウエオ", 390, 190);
        ctx.fillText("カキクケコ", 390, 200);
        ctx.fillText("サシスセソ", 390, 210);
        ctx.fillText("タチツテト", 390, 220);
        ctx.fillText("ナニヌネノ", 390, 230);
        ctx.fillText("ハヒフヘホ", 390, 240);
        ctx.fillText("マミムメモ", 390, 250);
        ctx.fillText("ヤ　ユ　ヨ", 390, 260);
        ctx.fillText("ラリルレロ", 390, 270);
        ctx.fillText("ワ　　　ヲ", 390, 280);
        ctx.fillText("ン", 390, 290);

        ctx.font = "30px kyokasho";

        ctx.fillText("ABCDE", 0, 250);
        ctx.fillText("あいうえお", 0, 280);
    }

}

class ErrorScreen {

    static STATE = Object.freeze({
        Main: 0,
    });

    static currentState = ErrorScreen.STATE.Main;

    static list = [];

    constructor() {
    }

    static init() {
        canvas.style.backgroundColor = CANVAS_ORIGIN_COLOR;

        MOUSE_SPRITE.changeAnimation("error");

        this.sadMoe = new Sprite({ w: 22, h: 22 }, centerX(22), 160, null, "", { x: 2, y: 2 });
        this.sadMoe.addAnimation("normal", { x: 448, y: 272 });
        this.sadMoe.changeAnimation("normal");
        ErrorScreen.list.push(this.sadMoe);

    }

    static update(dt) {
        Sprite.manageBeforeUpdating(ErrorScreen.list, dt);
        ErrorScreen.list = ErrorScreen.list.filter(sp => {
            return !sp.delete;
        });
    }

    static changeState(pNewState) {
        ErrorScreen.state = pNewState;
        Panel.resetTypeState("error", pNewState);
        Button.resetTypeState("error", pNewState);
    }

    static draw(ctx) {

        Sprite.manageBeforeDrawing(ErrorScreen.list);

        ctx.font = "10px jpfont";
        ctx.textAlign = "center";
        ctx.fillStyle = RED_COLOR;
        ctx.fillText(translationEn["connection_error1"], 225, 50);
        ctx.fillText(translationEn["connection_error2"], 225, 70);

        ctx.fillText(translationFr["connection_error1"], 225, 100);
        ctx.fillText(translationFr["connection_error2"], 225, 120);

    }
}